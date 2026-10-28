exec((__import__('pathlib').Path(__file__).with_name('analyze.py')).read_text().split('inventory=[]')[0])
inv=json.loads((OUT/'data_inventory.json').read_text(encoding='utf-8'))
def load(prefix):return pd.read_pickle(next((ROOT/'work').glob(prefix+'*.pkl')))
results=[]
def rate(df,col,title,weight):
 s=df[col];ok=s.isin([1,2]);w=df[weight];r={'indicator':title,'yes':int((s==1).sum()),'valid':int(ok.sum()),'unweighted_pct':round(100*(s[ok]==1).mean(),2),'weighted_pct_provisional':round(100*w[s==1].sum()/w[ok].sum(),2)};results.append(r);print(r)
s0=load('S0_');s6=load('S6_');s4=load('S4_');s3=load('S3_')
print('IDs',s0.V1.nunique(),s6.V1.nunique(),s4.V1.nunique(),s3.V1.nunique())
for c in ['V6','V12']:print('S3 inconsistency',c,s3.groupby('V1')[c].nunique().value_counts().to_dict())
s3=s3.drop_duplicates('V1')
rate(s0,'V17','Cooperative membership','V25')
for c,t in [('V14','Any erosion control'),('V18','Erosion increasing (yes/no respondents)'),('V22','Limitations applying soil protection'),('V29','Any irrigation'),('V36','Mechanical equipment')]:rate(s6,c,t,'V40')
rate(s3,'V6','Any extension service','V24')
rate(s4,'V6','Financial institution account','V19');rate(s4,'V7','Requested loan','V19')
lim=s6[s6.V22==1];print('LIMITATIONS denominator',len(lim))
for code in range(1,6):
 mask=lim[['V23','V25','V27']].eq(code).any(axis=1);print('lim',code,int(mask.sum()),round(100*mask.mean(),2))
allcrop=[]
for prefix in ['S8_A','S8_B']:
 d=load(prefix);d['season']=prefix;allcrop.append(d)
 print(prefix,'unique households',d.V1.nunique(),'production nonmissing',d.V8.notna().sum(),'loss nonmissing',d.V21.notna().sum(),'loss positive',(d.V21>0).sum(),'loss > production',(d.V21>d.V8).sum(),'negative loss',(d.V21<0).sum())
 rate(d,'V24',prefix+' Applies postharvest training','V31')
 print('storage',d.V23.value_counts().to_dict(),'production quantiles',d.V8.quantile([0,.5,.95,.99,1]).to_dict(),'loss quantiles',d.V21.quantile([0,.5,.95,.99,1]).to_dict())
d=pd.concat(allcrop);valid=d.V8.gt(0)&d.V21.ge(0)&d.V21.le(d.V8);q=d[valid].copy();q['loss_pct']=q.V21/q.V8*100
print('LOSS valid',len(q),'positive',int(q.V21.gt(0).sum()),'median pct among positive',q.loc[q.V21>0,'loss_pct'].median(),'aggregate pct',100*q.V21.sum()/q.V8.sum())
labels=next(i for i in inv if i['file'].startswith('S8_A'))['variables'][6]['values']
rows=[]
for code,g in q.groupby('V7'):
 if len(g)<100:continue
 rows.append({'crop_code':code,'crop':labels.get(str(code),str(code)),'records':len(g),'positive_loss_records':int((g.V21>0).sum()),'positive_loss_pct':round(100*(g.V21>0).mean(),2),'loss_kg':g.V21.sum(),'production_kg':g.V8.sum(),'aggregate_loss_pct':round(100*g.V21.sum()/g.V8.sum(),2)})
tab=pd.DataFrame(rows).sort_values('loss_kg',ascending=False);tab.to_csv(OUT/'crop_loss_summary.csv',index=False);print(tab.head(10).to_string(index=False))
district_labels=next(i for i in inv if i['file'].startswith('S0_'))['variables'][4]['values']
m=s6[['V1','V11','V18','V22','V23','V25','V27','V29']].merge(s3[['V1','V6']],on='V1',validate='one_to_one')
target=(m.V18==1)&(m.V22==1);print('erosion+barrier',int(target.sum()),'without extension',int((target&(m.V6==2)).sum()))
district=[]
for code,g in m.groupby('V11'):
 a=(g.V18==1)&(g.V22==1);district.append({'district':district_labels.get(str(code),str(code)),'sample_households':len(g),'erosion_and_barrier_n':int(a.sum()),'erosion_and_barrier_pct':round(100*a.mean(),2),'erosion_barrier_no_extension_n':int((a&(g.V6==2)).sum())})
dt=pd.DataFrame(district).sort_values('erosion_and_barrier_pct',ascending=False);dt.to_csv(OUT/'soil_support_by_district.csv',index=False);print(dt.head(10).to_string(index=False))
pd.DataFrame(results).to_csv(OUT/'key_indicators.csv',index=False)
