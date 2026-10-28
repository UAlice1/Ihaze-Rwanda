"""Reproducible descriptive research. No raw rows are exported to the app."""
from pathlib import Path
import argparse
import hashlib
import json
import struct
import numpy as np
import pandas as pd

def structural_audit(path):
    b=path.read_bytes(); slots,compression,n=struct.unpack_from('<iii',b,68)[0],struct.unpack_from('<i',b,72)[0],struct.unpack_from('<i',b,80)[0]
    pos=176;variables=[];count=0;user_missing=[]
    def integer():
        nonlocal pos
        x=struct.unpack_from('<i',b,pos)[0];pos+=4;return x
    while True:
        t=integer()
        if t==2:
            typ,has,missing,_,_=struct.unpack_from('<5i',b,pos);pos+=20
            name=b[pos:pos+8].decode().strip();pos+=8
            if has:
                size=integer();pos+=(size+3)//4*4
            if missing:
                user_missing.append({'variable':name,'format':missing,'values':list(struct.unpack_from('<'+'d'*abs(missing),b,pos))});pos+=8*abs(missing)
            if typ>=0:variables.append((name,typ,count))
            count+=1
        elif t==3:
            for _ in range(integer()):
                pos+=8;size=b[pos];pos+=((size+1+7)//8)*8
            assert integer()==4
            number=integer();pos+=4*number
        elif t==6:
            number=integer();pos+=80*number
        elif t==7:
            _,size,number=integer(),integer(),integer();pos+=size*number
        elif t==999:integer();break
        else:raise ValueError((path.name,t,pos))
    return {'file':path.name,'rows':n,'slots':slots,'dictionary_slots':count,'compression':compression,
            'data_bytes':len(b)-pos,'expected_data_bytes':n*slots*8,
            'structure_valid':b[:4]==b'$FL2' and compression==0 and count==slots and len(b)-pos==n*slots*8,
            'user_missing_definitions':user_missing,'sha256':hashlib.sha256(b).hexdigest()}

def build(root):
    def load(prefix):return pd.read_pickle(next((root/'work').glob(prefix+'*.pkl')))
    inventory=json.loads((root/'outputs/data_inventory.json').read_text(encoding='utf-8'))
    crop_labels=next(i for i in inventory if i['file'].startswith('S8_A'))['variables'][6]['values']
    district_labels=next(i for i in inventory if i['file'].startswith('S0_'))['variables'][4]['values']
    s0,s2,s3,s4,s5,s6=[load(p) for p in ['S0_','S2_','S3_','S4_','S5_','S6_']]
    for df in [s2,s4,s5,s6]:assert not df.V1.isna().any() and df.V1.is_unique
    assert s3.groupby('V1').V6.nunique().max()==1
    ext=s3.drop_duplicates('V1')[['V1','V6']].rename(columns={'V6':'extension'})
    hh=s6[['V1','V11','V18','V22','V23','V25','V27']].rename(columns={'V11':'district','V18':'erosion','V22':'barrier'})
    hh=hh.merge(ext,on='V1',validate='one_to_one').merge(s4[['V1','V6','V7']].rename(columns={'V6':'account','V7':'loan_request'}),on='V1',validate='one_to_one')
    assert len(hh)==16057 and set(hh.V1)==set(s5.V1)==set(s2.V1)
    audit={'scope':'Structural and internal consistency checks; not independent SPSS-reader or survey-design validation',
           'files':[structural_audit(p) for p in sorted((root/'spss').glob('*.sav'))],
           'households':len(hh),'unique_household_joins':True,'extension_rows':len(s3),
           'extension_households':len(ext),'extension_within_household_consistent':True,
           'crop_area_available':False,'crop_area_note':'S2 labels document land ownership/use flags, not a validated crop/season area. Production quantity is not yield.',
           'production_duplicates':{},'seed_duplicates':{}}
    assert all(f['structure_valid'] for f in audit['files'])
    # Do not proceed silently if the source declares special numeric missing codes.
    assert not any(f['user_missing_definitions'] for f in audit['files']), 'Review user-defined missing values before analysis'
    input_rates=[]
    for season,mapping in [('A',{'Organic fertilizer':'V6','Inorganic fertilizer':'V26','Pesticide':'V64'}),('B',{'Organic fertilizer':'V16','Inorganic fertilizer':'V45','Pesticide':'V86'})]:
        for label,col in mapping.items():
            valid=s5[col].isin([1,2]);yes=int(s5[col].eq(1).sum());n=int(valid.sum())
            input_rates.append({'season':season,'input':label,'yes':yes,'valid':n,'pct':round(100*yes/n,2),'source':'S5 '+col,'denominator':'All valid S5 household responses; not restricted to crop growers'})
    finance=[]
    for label,col in [('Financial institution account','V6'),('Requested a loan','V7'),('Received agricultural grant','V17')]:
        valid=s4[col].isin([1,2]);yes=int(s4[col].eq(1).sum());n=int(valid.sum());finance.append({'indicator':label,'yes':yes,'valid':n,'pct':round(100*yes/n,2),'source':'S4 '+col})
    borrowers=s4[s4.V7==1]
    approvals=[{'outcome':label,'count':int(borrowers.V9.eq(code).sum()),'valid':int(borrowers.V9.isin([1,2,3]).sum()),'pct':round(100*borrowers.V9.eq(code).sum()/borrowers.V9.isin([1,2,3]).sum(),2)} for code,label in [(1,'Approved at least 75%'),(2,'Approved below 75%'),(3,'Rejected')]]
    rejected=borrowers[borrowers.V9==3];reasons=[{'reason':label,'count':int(rejected.V10.eq(code).sum()),'valid':int(rejected.V10.isin([1,2,3,4,5]).sum())} for code,label in [(1,'Insufficient income'),(2,'Insufficient collateral'),(3,'Debt history'),(4,'Unclear purpose'),(5,'Other')]]
    # Core erosion/barrier cohort; multiple barriers can overlap.
    targets=[]
    barriers=[('any','Any reported barrier',None),('finance','Finance',1),('knowledge','Knowledge',4),('labour','Family labour',2),('tenure','Land tenure',3)]
    for code,group in hh.groupby('district'):
        base=group.erosion.eq(1)&group.barrier.eq(1)
        for key,label,value in barriers:
            mask=base if value is None else base&group[['V23','V25','V27']].eq(value).any(axis=1)
            targets.append({'district':district_labels[str(code)],'barrier':key,'label':label,'sample_households':len(group),
                            'eligible':int(mask.sum()),'no_extension':int((mask&group.extension.eq(2)).sum())})
    comparisons=[];linked=[]
    for season,prefix,organic,inorganic,pesticide,slots in [
        ('A','S8_A','V6','V26','V64',[('V108','V109'),('V117','V118'),('V126','V127')]),
        ('B','S8_B','V16','V45','V86',[('V135','V136'),('V144','V145'),('V153','V154')])]:
        prod=load(prefix)[['V1','V7','V8','V21','V24','V23']].rename(columns={'V7':'crop','V8':'production_kg','V21':'loss_kg','V24':'training','V23':'storage'})
        dup=prod.duplicated(['V1','crop'],keep=False);audit['production_duplicates'][season]={'records':int(dup.sum()),'keys':int(prod.loc[dup,['V1','crop']].drop_duplicates().shape[0])}
        prod=prod.loc[~dup & prod.production_kg.ge(0)].copy()
        inputs=s5[['V1',organic,inorganic,pesticide]].rename(columns={organic:'organic',inorganic:'inorganic',pesticide:'pesticide'})
        prod=prod.merge(inputs,on='V1',validate='many_to_one').merge(hh[['V1','district','extension','account']],on='V1',validate='many_to_one')
        seeds=pd.concat([s5[['V1',crop,typ]].rename(columns={crop:'crop',typ:'seed_type'}) for crop,typ in slots],ignore_index=True)
        seeds=seeds[seeds.seed_type.isin([1,2,3])&seeds.crop.notna()].copy()
        duplicate_seeds=seeds.duplicated(['V1','crop'],keep=False);audit['seed_duplicates'][season]={'records':int(duplicate_seeds.sum())}
        seeds=seeds.loc[~duplicate_seeds];prod=prod.merge(seeds,on=['V1','crop'],how='left',validate='one_to_one')
        prod['seed_improved']=prod.seed_type.map({1:2,2:1,3:1})
        for code,g in prod.groupby('crop'):
            for variable,label in [('extension','Extension receipt'),('account','Financial account'),('inorganic','Household inorganic fertilizer use'),('organic','Household organic fertilizer use'),('seed_improved','Crop-specific improved seed use')]:
                yes=g.loc[g[variable]==1,'production_kg'];no=g.loc[g[variable]==2,'production_kg']
                if min(len(yes),len(no))<30:continue
                comparisons.append({'season':season,'crop_code':code,'crop':crop_labels.get(str(code),str(code)),'factor':label,
                    'yes_n':len(yes),'no_n':len(no),'yes_median_kg':round(float(yes.median()),2),'no_median_kg':round(float(no.median()),2),
                    'yes_q25_kg':round(float(yes.quantile(.25)),2),'yes_q75_kg':round(float(yes.quantile(.75)),2),
                    'no_q25_kg':round(float(no.quantile(.25)),2),'no_q75_kg':round(float(no.quantile(.75)),2),
                    'outcome':'Recorded crop production quantity (kg), not yield','adjustment':'Unadjusted; farm size, district, selection and other factors can explain differences'})
        linked.append({'season':season,'unambiguous_production_records':len(prod),'matched_valid_seed_records':int(prod.seed_type.notna().sum())})
    return {'version':'research-2017-v1','metadata':{'period':'2016–2017','weighting':'Unweighted sample descriptions','causal':False,'production_outcome':'Recorded quantity (kg), not yield','minimum_group_n':30,'independent_validation':'Pending'},
            'audit':audit,'inputs':input_rates,'finance':finance,'first_loan_outcomes':approvals,'first_loan_rejection_reasons':reasons,
            'support_targets':targets,'production_comparisons':comparisons,'linkage':linked,
            'notes':['Fertilizer/pesticide flags describe household use, not treatment of the specific crop.','Season A/B input alignment follows questionnaire block sequence; confirm against the full questionnaire.','Seed comparisons require exact household/crop/season match; ambiguous duplicate keys are excluded.','No significance tests, causal effects, yield estimates or national prevalence rankings are claimed.']}

if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--data-root',type=Path,required=True);ap.add_argument('--output',type=Path,required=True);args=ap.parse_args()
    result=build(args.data_root)
    args.output.write_text(json.dumps(result,indent=2,ensure_ascii=False,allow_nan=False),encoding='utf-8')
    print('Structural audit:',len(result['audit']['files']),'files passed')
    print('Input rates:',result['inputs']);print('First-loan outcomes:',result['first_loan_outcomes'])
    print('Production comparisons:',len(result['production_comparisons']));print('Linkage:',result['linkage']);print('Saved',args.output)
