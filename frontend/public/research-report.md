# AgriInsight Rwanda: expanded research briefing

**Period:** 2016–2017. **Scope:** unweighted historical sample evidence. Structural/internal verification passed; independent SPSS-reader verification, sampling design, eligibility and questionnaire validation remain pending.

## What has been checked

- All 16 source files have consistent dictionary slot counts and exact expected uncompressed record lengths.
- No source-defined special missing-value definitions were declared. Questionnaire NA codes and skip patterns still require review.
- S2/S4/S5/S6 household keys are unique, have matching sets, and join to 16,057 households. S3 extension receipt is consistent across repeated rows and was deduplicated.
- These are internal consistency checks, not independent extraction validation or certification of survey estimates.

## Agricultural input use

| Season | Input | Yes / valid | Sample share | Source |
|---|---|---:|---:|---|
| A | Organic fertilizer | 11,080 / 16,057 | 69.0% | S5 V6 |
| A | Inorganic fertilizer | 4,440 / 16,057 | 27.65% | S5 V26 |
| A | Pesticide | 2,579 / 16,057 | 16.06% | S5 V64 |
| B | Organic fertilizer | 8,336 / 16,057 | 51.92% | S5 V16 |
| B | Inorganic fertilizer | 3,360 / 16,057 | 20.93% | S5 V45 |
| B | Pesticide | 2,767 / 16,057 | 17.23% | S5 V86 |

Denominators include all valid S5 households, not just crop growers. Use is not equivalent to access, suitability or unmet demand. Season A/B input alignment follows the questionnaire block sequence and requires confirmation against the full questionnaire.

## Financing

| First-loan outcome | Applicants | Share of 747 valid responses |
|---|---:|---:|
| Approved at least 75% | 641 | 85.81% |
| Approved below 75% | 81 | 10.84% |
| Rejected | 25 | 3.35% |

Only 747 of 16,057 households reported a loan request. Of these first-loan applicants, 25 reported rejection. These data do not establish why non-applicants did not apply, so widespread loan rejection is not supported by these figures.

## Production comparisons

The app includes 181 descriptive comparisons by crop, season and characteristic, with at least 30 records per yes/no group. It displays medians and quartiles. These are recorded quantities, not yields; quartiles are not confidence intervals. No adjustment, significance or causal claim is made.

For illustration, Season A maize records show:

| Reported characteristic | Yes group n | Yes median kg | No group n | No median kg |
|---|---:|---:|---:|---:|
| Extension receipt | 2728 | 100.0 | 5509 | 55.0 |
| Financial account | 4288 | 95.0 | 3949 | 50.0 |
| Household inorganic fertilizer use | 2939 | 115.0 | 5298 | 50.0 |
| Household organic fertilizer use | 6205 | 70.0 | 2032 | 50.0 |
| Crop-specific improved seed use | 2922 | 100.0 | 5314 | 50.0 |

Do not interpret these differences as benefits caused by extension, accounts, fertilizer or improved seed. Farm area, geography, selection and other factors are not controlled. Extension is any reported service, which may include livestock services. Fertilizer use is a household-level flag and does not identify the crop treated. Improved-seed comparisons match household/crop/season and include improved or mixed seeds in the yes group.

No validated crop/season area variable has been identified in the supplied land file. Yield estimates and yield prediction are therefore not justified.

## Duplicate records and exclusions

- Season A: excluded 24 ambiguous production records across 12 repeated household–crop keys from production comparisons. Excluded 2 repeated seed entries from seed matching. Original loss-summary tables retain their initial crop-record definitions.
- Season B: excluded 32 ambiguous production records across 16 repeated household–crop keys from production comparisons. Excluded 30 repeated seed entries from seed matching. Original loss-summary tables retain their initial crop-record definitions.

## How this improves decision support

The support planner now filters the existing increasing-erosion + protection-barrier cohort by finance, knowledge, labour or tenure barriers, with an optional no-extension criterion. Counts describe historical sample cases and are not current operational lists. Multiple barriers overlap.

| Barrier | Suggested category of further assessment |
|---|---|
| Finance | Assess costs and referral options; do not infer loan or grant eligibility |
| Knowledge | Assess training/extension needs with local officers |
| Family labour | Investigate labour constraints and feasible community support |
| Land tenure | Seek appropriate tenure-information/advisory referral |

## Next evidence requirements

1. Obtain the exact survey catalogue record, full questionnaire, sampling report and data-use terms.
2. Independently read the files with SPSS/pyreadstat and reconcile counts and missing-value handling.
3. Confirm eligible populations and survey weights before national estimates or district rankings.
4. Assess confounding and choose a defensible statistical/modeling question before fitting models.
5. Use newer data and field feedback before current targeting or intervention-effect claims.

## Source identification

The section structure, period and sample count match NISR Agricultural Household Survey 2017, reference RWA-NISR-RAHS-2017-V0.1. This is not independent file/result verification. Catalogue: https://microdata.statistics.gov.rw/index.php/catalog/90 . See SOURCE_NOTES.md for documentation and remaining checks.
