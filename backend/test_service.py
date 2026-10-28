import io
import json
import os
import threading
import unittest
from unittest.mock import patch
from http.server import ThreadingHTTPServer
from urllib.request import Request, urlopen
from urllib.error import HTTPError
from . import service
from .server import Handler

class ServiceTests(unittest.TestCase):
    def test_aggregate_integrity(self):
        data=service.districts()['data']
        self.assertEqual(len(data),30)
        self.assertEqual(sum(r['erosion_and_barrier_n'] for r in data),1834)
        self.assertEqual(sum(r['erosion_barrier_no_extension_n'] for r in data),1320)
        self.assertEqual(len(service.districts('gakenke')['data']),1)
        self.assertNotIn('weighted_pct_provisional',service.indicators()['data'][0])

    def test_planning_bounds(self):
        body={'district':'Gakenke','capacity':30}
        p=service.plan(body)['data'];self.assertEqual((p['eligible'],p['covered'],p['remaining']),(53,30,23))
        p=service.plan({**body,'capacity':1000,'require_no_extension':False})['data']
        self.assertEqual((p['eligible'],p['covered'],p['remaining']),(88,88,0))
        for invalid in [-1,True,1.5,'30',None,float('nan'),float('inf'),100001]:
            with self.subTest(invalid=invalid),self.assertRaises(service.APIError):service.plan({**body,'capacity':invalid})
        with self.assertRaises(service.APIError):service.plan({**body,'require_no_extension':'false'})

    def test_lookup_and_missing_ai(self):
        self.assertIn('139 of 379',service.ask({'question':'tomato losses'})['answer'])
        self.assertFalse(service.ask({'question':'identify wheat disease'})['supported'])
        for invalid in ['',None,'x'*1001,False]:
            with self.assertRaises(service.APIError):service.ask({'question':invalid})
        with patch.dict(os.environ,{},clear=True),self.assertRaises(service.APIError) as cm:
            service.ask({'question':'soil erosion','mode':'ai'})
        self.assertEqual(cm.exception.status,503)

    def test_ai_payload_and_output(self):
        def fake(req,timeout):
            self.assertEqual(req.full_url,'https://api.openai.com/v1/responses')
            payload=json.loads(req.data)
            self.assertFalse(payload['store'])
            self.assertIn('approved_evidence',json.loads(payload['input']))
            self.assertNotIn('Household_ID',payload['input'])
            return io.BytesIO(json.dumps({'output':[{'type':'message','content':[{'type':'output_text','text':'Historical sample explanation.'}]}]}).encode())
        with patch.dict(os.environ,{'OPENAI_API_KEY':'test-only','OPENAI_MODEL':'test-model'}):
            result=service.ask({'question':'soil barriers','mode':'ai'},transport=fake)
        self.assertEqual(result['mode'],'ai');self.assertIn('approved_evidence',result)

    def test_ai_failure_is_not_silent_fallback(self):
        def fail(*args,**kwargs):raise TimeoutError()
        with patch.dict(os.environ,{'OPENAI_API_KEY':'test-only','OPENAI_MODEL':'test-model'}),self.assertRaises(service.APIError) as cm:
            service.ask({'question':'irrigation','mode':'ai'},transport=fail)
        self.assertEqual(cm.exception.status,502)

    def test_database_read_and_failure(self):
        payload=[{'district':'Gakenke','sample_households':'352','erosion_and_barrier_n':'88','erosion_and_barrier_pct':'25','erosion_barrier_no_extension_n':'53'}]
        with patch.dict(os.environ,{'AGRI_DATABASE_URL':'test-only'}),patch('backend.database.load',return_value=payload):
            self.assertEqual(service.districts()['data'][0]['sample_households'],352)
        with patch.dict(os.environ,{'AGRI_DATABASE_URL':'test-only'}),patch('backend.database.load',side_effect=RuntimeError('connection failure')),self.assertRaises(service.APIError) as cm:
            service.districts()
        self.assertEqual(cm.exception.status,503)

class HTTPTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server=ThreadingHTTPServer(('127.0.0.1',0),Handler)
        cls.thread=threading.Thread(target=cls.server.serve_forever,daemon=True);cls.thread.start()
        cls.url='http://127.0.0.1:'+str(cls.server.server_port)

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown();cls.server.server_close();cls.thread.join()

    def test_read_routes_and_static_boundary(self):
        for path in ['/','/app.js','/backend.js','/api/health','/api/districts?q=Gakenke','/api/crops','/api/indicators']:
            with urlopen(self.url+path) as r:self.assertEqual(r.status,200)
        for path in ['/api/unknown','/backend/service.py','/../README.md']:
            with self.assertRaises(HTTPError) as cm:urlopen(self.url+path)
            self.assertEqual(cm.exception.code,404)

    def test_post_validations(self):
        req=Request(self.url+'/api/plan',data=json.dumps({'district':'Gakenke','capacity':30}).encode(),headers={'Content-Type':'application/json'})
        with urlopen(req) as r:self.assertEqual(json.load(r)['data']['remaining'],23)
        req=Request(self.url+'/api/plan',data=json.dumps({'district':'Gakenke','capacity':30}).encode(),headers={'Content-Type':'application/json','Origin':'http://127.0.0.1:3000'})
        with urlopen(req) as r:self.assertEqual(json.load(r)['data']['remaining'],23)
        for data,headers,status in [(b'{',{'Content-Type':'application/json'},400),(b'[]',{'Content-Type':'application/json'},400),(b'{}',{'Content-Type':'text/plain'},415),(b'{}',{'Content-Type':'application/json','Origin':'https://other.example'},403)]:
            req=Request(self.url+'/api/plan',data=data,headers=headers)
            with self.assertRaises(HTTPError) as cm:urlopen(req)
            self.assertEqual(cm.exception.code,status)

if __name__=='__main__':unittest.main()
