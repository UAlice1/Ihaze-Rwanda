"""HTTP checks for the built Next.js app and its Python API proxy."""
import json
import re
from urllib.request import Request, urlopen

BASE = 'http://127.0.0.1:3000'
def get(path):
    with urlopen(BASE+path, timeout=30) as r:
        assert r.status == 200
        return r.read().decode()

html=get('/')
assert 'Turn evidence into better support.' in html
assert 'Next.js + Tailwind CSS' in html
assert '16,057' in html
assert 'Inputs &amp; research' in html
assets=re.findall(r'(?:href|src)="([^\"]+\.(?:css|js)(?:\?[^\"]*)?)"',html)
assert any('.css' in p for p in assets)
css='\n'.join(get(p) for p in assets if '.css' in p)
assert 'tailwindcss' in css and '.bg-forest' in css
for p in assets:
    if '.js' in p:get(p)
health=json.loads(get('/api/health'));assert health['status']=='ok'
research=json.loads(get('/api/research'))
assert len(research['inputs'])==6 and len(research['production_comparisons'])==181
assert 'expanded research briefing' in get('/research-report.md')
districts=json.loads(get('/api/districts?q=Gakenke'))['data']
assert len(districts)==1 and districts[0]['erosion_barrier_no_extension_n']==53
for endpoint,payload in [('/api/plan',{'district':'Gakenke','capacity':30}),('/api/ask',{'question':'tomato losses','mode':'lookup'})]:
    req=Request(BASE+endpoint,data=json.dumps(payload).encode(),headers={'Content-Type':'application/json','Origin':BASE})
    with urlopen(req,timeout=30) as r:result=json.load(r)
    if endpoint.endswith('plan'):assert result['data']['remaining']==23
    else:assert '139 of 379' in result['answer']
req=Request(BASE+'/api/plan',data=json.dumps({'district':'Gakenke','capacity':30,'barrier':'knowledge'}).encode(),headers={'Content-Type':'application/json','Origin':BASE})
with urlopen(req,timeout=30) as r:assert json.load(r)['data']['eligible']==8
print('PASS: Next.js SSR page, compiled Tailwind CSS, JavaScript assets, GET proxy, planning POST proxy and evidence POST proxy.')
print('Visual/browser interactions and paid AI calls were not tested.')
