"""Generate an evidence briefing from aggregate research.json."""
from pathlib import Path
import json
import argparse

def report(r):
    lines=['# AgriInsight Rwanda: expanded research briefing','',
    '**Period:** 2016–2017. **Scope:** unweighted historical sample evidence. Structural/internal verification passed; independent SPSS-reader verification, sampling design, eligibility and questionnaire validation remain pending.','',
    '## What has been checked','',
    f"- All {len(r['audit']['files'])} source files have consistent dictionary slot counts and exact expected uncompressed record lengths.",
    '- No source-defined special missing-value definitions were declared. Questionnaire NA codes and skip patterns still require review.',
    '- S2/S4/S5/S6 household keys are unique, have matching sets, and join to 16,057 households. S3 extension receipt is consistent across repeated rows and was deduplicated.',
    '- These are internal consistency checks, not independent extraction validation or certification of survey estimates.','',
    '## Agricultural input use','', '| Season | Input | Yes / valid | Sample share | Source |','|---|---|---:|---:|---|']
    for x in r['inputs']:lines.append(f"| {x['season']} | {x['input']} | {x['yes']:,} / {x['valid']:,} | {x['pct']}% | {x['source']} |")
    lines+=['','Denominators include all valid S5 households, not just crop growers. Use is not equivalent to access, suitability or unmet demand. Season A/B input alignment follows the questionnaire block sequence and requires confirmation against the full questionnaire.','',
    '## Financing','', '| First-loan outcome | Applicants | Share of 747 valid responses |','|---|---:|---:|']
    for x in r['first_loan_outcomes']:lines.append(f"| {x['outcome']} | {x['count']} | {x['pct']}% |")
    lines+=['','Only 747 of 16,057 households reported a loan request. Of these first-loan applicants, 25 reported rejection. These data do not establish why non-applicants did not apply, so widespread loan rejection is not supported by these figures.','',
    '## Production comparisons','',f"The app includes {len(r['production_comparisons'])} descriptive comparisons by crop, season and characteristic, with at least 30 records per yes/no group. It displays medians and quartiles. These are recorded quantities, not yields; quartiles are not confidence intervals. No adjustment, significance or causal claim is made.",'',
    'For illustration, Season A maize records show:','', '| Reported characteristic | Yes group n | Yes median kg | No group n | No median kg |','|---|---:|---:|---:|---:|']
    for x in r['production_comparisons']:
        if x['crop']=='Maize' and x['season']=='A':lines.append(f"| {x['factor']} | {x['yes_n']} | {x['yes_median_kg']} | {x['no_n']} | {x['no_median_kg']} |")
    lines+=['','Do not interpret these differences as benefits caused by extension, accounts, fertilizer or improved seed. Farm area, geography, selection and other factors are not controlled. Extension is any reported service, which may include livestock services. Fertilizer use is a household-level flag and does not identify the crop treated. Improved-seed comparisons match household/crop/season and include improved or mixed seeds in the yes group.','',
    'No validated crop/season area variable has been identified in the supplied land file. Yield estimates and yield prediction are therefore not justified.','',
    '## Duplicate records and exclusions','']
    for s in ['A','B']:
        p=r['audit']['production_duplicates'][s];lines.append(f"- Season {s}: excluded {p['records']} ambiguous production records across {p['keys']} repeated household–crop keys from production comparisons. Excluded {r['audit']['seed_duplicates'][s]['records']} repeated seed entries from seed matching. Original loss-summary tables retain their initial crop-record definitions.")
    lines+=['','## How this improves decision support','',
    'The support planner now filters the existing increasing-erosion + protection-barrier cohort by finance, knowledge, labour or tenure barriers, with an optional no-extension criterion. Counts describe historical sample cases and are not current operational lists. Multiple barriers overlap.','',
    '| Barrier | Suggested category of further assessment |','|---|---|',
    '| Finance | Assess costs and referral options; do not infer loan or grant eligibility |',
    '| Knowledge | Assess training/extension needs with local officers |',
    '| Family labour | Investigate labour constraints and feasible community support |',
    '| Land tenure | Seek appropriate tenure-information/advisory referral |','',
    '## Next evidence requirements','',
    '1. Obtain the exact survey catalogue record, full questionnaire, sampling report and data-use terms.',
    '2. Independently read the files with SPSS/pyreadstat and reconcile counts and missing-value handling.',
    '3. Confirm eligible populations and survey weights before national estimates or district rankings.',
    '4. Assess confounding and choose a defensible statistical/modeling question before fitting models.',
    '5. Use newer data and field feedback before current targeting or intervention-effect claims.','']
    lines += ['## Source identification','',
    'The section structure, period and sample count match NISR Agricultural Household Survey 2017, reference RWA-NISR-RAHS-2017-V0.1. This is not independent file/result verification. Catalogue: https://microdata.statistics.gov.rw/index.php/catalog/90 . See SOURCE_NOTES.md for documentation and remaining checks.','']
    return '\n'.join(lines)

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('source',type=Path);p.add_argument('output',type=Path);a=p.parse_args()
    a.output.write_text(report(json.loads(a.source.read_text(encoding='utf-8'))),encoding='utf-8')
    print(a.output)
