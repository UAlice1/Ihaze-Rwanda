from pathlib import Path
import struct,json
import numpy as np
import pandas as pd
import os
ROOT=Path(os.environ.get('AGRI_DATA_ROOT', str(Path.cwd()))).resolve()
(ROOT/'work').mkdir(exist_ok=True)
OUT=ROOT/'outputs'; OUT.mkdir(exist_ok=True)
def read(p):
 b=p.read_bytes(); pos=176; vs=[]; slots=[]; labs={}
 def ints(n):
  nonlocal pos
  x=struct.unpack_from('<'+'i'*n,b,pos);pos+=4*n;return x
 while True:
  t=ints(1)[0]
  if t==2:
   typ,has,miss,pr,wr=ints(5);name=b[pos:pos+8].rstrip(b' ').decode();pos+=8;label=''
   if has:
    n=ints(1)[0];label=b[pos:pos+n].decode('utf-8','replace');pos+=(n+3)//4*4
   if miss:pos+=8*(abs(miss))
   slots.append(typ)
   if typ>=0:vs.append(dict(name=name,label=label,type=typ,slot=len(slots)-1))
  elif t==3:
   n=ints(1)[0];vl={}
   for _ in range(n):
    value=struct.unpack_from('<d',b,pos)[0];pos+=8;ln=b[pos];pos+=1;label=b[pos:pos+ln].decode('utf-8','replace');pos+=((ln+1+7)//8*8)-1;vl[value]=label
   assert ints(1)[0]==4
   for ix in ints(ints(1)[0]):labs[ix-1]=vl
  elif t==6:pos+=80*ints(1)[0]
  elif t==7:
   sub,size,n=ints(3);pos+=size*n
  elif t==999:ints(1);break
  else:raise ValueError((p.name,t,pos))
 nslots=struct.unpack_from('<i',b,68)[0];comp=struct.unpack_from('<i',b,72)[0];n=struct.unpack_from('<i',b,80)[0]
 assert comp==0
 arr=np.frombuffer(b,dtype='V8',offset=pos,count=n*nslots).reshape(n,nslots)
 data={}
 for v in vs:
  j=v['slot'];typ=v['type'];v['values']=labs.get(j,{})
  if typ==0:
   x=arr[:,j].copy().view('<f8').ravel();x[x<-1e300]=np.nan;data[v['name']]=x
  else:
   data[v['name']]=[b''.join(row[j:j+(typ+7)//8]).decode('utf-8','replace').strip() for row in arr]
 return pd.DataFrame(data),vs
inventory=[]
for p in sorted((ROOT/'spss').glob('*.sav')):
 df,vs=read(p)
 item={'file':p.name,'rows':len(df),'columns':len(vs),'variables':vs}
 for v in vs:
  s=df[v['name']];v['missing']=int(s.isna().sum());v['unique']=int(s.nunique());v['top']={str(k):int(z) for k,z in s.value_counts().head(12).items()}
 inventory.append(item)
 df.to_pickle(ROOT/'work'/(p.stem+'.pkl'))
 print(p.name,len(df),len(vs))
(OUT/'data_inventory.json').write_text(json.dumps(inventory,indent=2,ensure_ascii=False),encoding='utf-8')
with (OUT/'variable_dictionary.txt').open('w',encoding='utf-8') as f:
 for item in inventory:
  f.write('\n'+item['file']+' | '+str(item['rows'])+' rows\n')
  for v in item['variables']:f.write(f"{v['name']}: {v['label']} | values={v['values']} | missing={v['missing']} | top={v['top']}\n")
