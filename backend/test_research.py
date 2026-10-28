import unittest
from . import service

class ResearchTests(unittest.TestCase):
    def test_structure_and_join_audit(self):
        r=service.research()
        self.assertEqual(len(r['audit']['files']),16)
        self.assertTrue(r['audit']['unique_household_joins'])
        for f in r['audit']['files']:
            self.assertTrue(f['structure_valid'])
            self.assertEqual(f['data_bytes'],f['expected_data_bytes'])
            self.assertEqual(f['user_missing_definitions'],[])

    def test_denominators_and_group_thresholds(self):
        r=service.research()
        for x in r['inputs']:
            self.assertAlmostEqual(x['pct'],100*x['yes']/x['valid'],places=2)
        self.assertEqual(sum(x['count'] for x in r['first_loan_outcomes']),747)
        for x in r['production_comparisons']:
            self.assertGreaterEqual(min(x['yes_n'],x['no_n']),30)
            for group in ['yes','no']:
                self.assertLessEqual(x[group+'_q25_kg'],x[group+'_median_kg'])
                self.assertLessEqual(x[group+'_median_kg'],x[group+'_q75_kg'])

    def test_target_counts_and_planner(self):
        r=service.research();base={x['district']:x['eligible'] for x in r['support_targets'] if x['barrier']=='any'}
        for x in r['support_targets']:
            self.assertLessEqual(x['no_extension'],x['eligible'])
            self.assertLessEqual(x['eligible'],base[x['district']])
        p=service.plan({'district':'Gakenke','capacity':30,'barrier':'knowledge'})['data']
        self.assertEqual((p['eligible'],p['covered'],p['remaining']),(8,8,0))
        p=service.plan({'district':'Gakenke','capacity':30,'barrier':'finance'})['data']
        self.assertEqual((p['eligible'],p['covered'],p['remaining']),(49,30,19))
        with self.assertRaises(service.APIError):service.plan({'district':'Gakenke','capacity':30,'barrier':'unknown'})

    def test_new_evidence_topics(self):
        for q,fragment in [('fertilizer use','27.65'),('first loan rejection','747'),('compare maize production season a','Unadjusted'),('predict yields','does not calculate yields')]:
            a=service.ask({'question':q})
            self.assertIn(fragment.lower(),a['answer'].lower())

if __name__=='__main__':unittest.main()
