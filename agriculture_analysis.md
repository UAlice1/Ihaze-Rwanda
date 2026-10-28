# Initial analysis and hackathon recommendation

## Scope and method
All 16 supplied SPSS files were read locally and inventoried. Detailed initial analysis focused on general information, extension services, funding, agricultural practices, and production/use/storage in Seasons A and B. This is exploratory analysis, not a completed causal or predictive study.

The files use generic variable names (V1, V2, etc.); labels and answer codes are essential. A local reader extracted the uncompressed SPSS dictionary, value labels and numeric data. The standard pyreadstat package was unavailable. An independent cross-check in SPSS or pyreadstat remains advisable before competition submission. Raw files were not changed.

S0 contains 23,709 records, including 290 without household IDs and 7,652 coded as having no agricultural activity. S2, S4, S5 and S6 each contain 16,057 rows. S6 and S4 each have 16,057 distinct household IDs. S3 has 64,228 records but only 16,057 distinct households; extension receipt is consistent within households and was deduplicated before household analysis. Production records repeat households by crop and season and must not be interpreted as independent households.

Question labels explicitly refer to the agricultural year 2016–2017 and Seasons A/B 2017. Treat this as historical evidence; obtain the survey report and questionnaire to confirm full scope, selection, reference periods and weights.

## Findings
The following percentages are unweighted sample descriptions, not national prevalence estimates.

| Indicator | Result | Denominator |
|---|---:|---|
| Received any extension service | 4,310 (26.84%) | 16,057 households |
| Used any irrigation technique | 1,495 (9.31%) | 16,057 households; not restricted to crop-growing households |
| Practised any erosion control | 9,837 (61.26%) | 16,057 households |
| Reported increasing erosion | 3,154 (20.67%) | 15,259 yes/no respondents; excludes 798 answering don't know |
| Reported limitations applying soil protection | 3,075 (19.16%) | 16,051 yes/no respondents |
| Cooperative membership | 1,998 (12.44%) | 16,057 households |
| Financial institution account | 8,352 (52.01%) | 16,057 households |
| Requested a loan | 747 (4.65%) | 16,057 households |

Among the 3,075 households reporting soil-protection barriers, 1,863 (60.59%) mentioned lack of finance, 1,026 (33.37%) lack of knowledge, 672 (21.85%) family labour limitations, and 559 (18.18%) tenure insecurity. Multiple responses were allowed; percentages do not sum to 100. Low loan-request rates do not establish rejection, unmet demand or the reason for non-application.

Joining S6 and deduplicated S3 one-to-one by household identifies **1,834 households reporting both increasing erosion and soil-protection barriers**. Of these, **1,320 (71.97%) reported no extension service**. This overlap is a practical historical targeting signal, not proof that lack of extension causes erosion.

Examples of unweighted within-district sample shares reporting both increasing erosion and barriers: Gakenke 88/352 (25.00%), Bugesera 136/596 (22.82%), Rulindo 90/406 (22.17%), and Ngororero 66/309 (21.36%). These are exploratory comparisons, not validated national district rankings. Survey design and uncertainty must be accounted for before using rankings operationally.

## Post-harvest alternative
Seasons A/B together contain 70,011 crop records. Of these, 63,979 have positive production and a recorded loss between zero and production. There are 1,033 positive-loss records. The many zeros need questionnaire validation: do not assume they measure all losses comprehensively.

Tomatoes stand out: 139 of 379 usable tomato crop-season records (36.68%) report positive losses. Reported tomato losses total 21,481 kg against 560,173.2 kg production (3.83%) in those records. Irish potatoes have 319 positive-loss records among 2,671 usable records (11.94%). These are crop-season sample figures; households can appear in both seasons.

Only 1,161/31,953 valid Season A records (3.63%) and 1,031/32,416 Season B records (3.18%) report applying post-harvest training skills. This measures reported application, not whether training was offered. Storage-facility answers are heavily missing and conditional; missing must not be recoded as no access.

## Recommended project: soil-protection support planner
Choose the Agriculture track. The most defensible initial problem is: **How can agricultural officers prioritize soil-protection support for farming communities reporting worsening erosion and barriers to acting?**

Primary users: district/sector agricultural officers and extension coordinators. Build an aggregate district dashboard showing sample size, reported erosion, barriers, extension coverage and their overlap. Allow filtering by barrier and show transparent reasons for prioritization. A user can enter a hypothetical outreach capacity and see how many historical sample cases it could cover; label this a planning scenario, not predicted erosion or yield improvement.

Use a simple transparent baseline first: increasing erosion + reported barrier, with missing extension as an additional service-gap flag. Finance, knowledge, labour and tenure flags suggest different referrals; they do not establish eligibility for a grant or the best agronomic treatment. Avoid an opaque AI score or fertilizer/terrace prescription unsupported by field assessment.

Validate with the survey documentation, design-aware weighted analysis, and discussions with agricultural officers/farmers. Add newer compatible data before making current operational recommendations. Measure prototype success by correct identification of documented sample groups, usable explanations, and officer task completion. Real-world impact requires a pilot; do not claim causal yield gains.

Alternative if the team prefers a crop-specific product: tomato post-harvest coordination. Validate losses, harvesting times, buyers, transport and storage options before proposing a cold room or marketplace; the survey alone does not establish their cost-effectiveness.

## Remaining checks before submission
- Verify the local extraction against SPSS/pyreadstat and the official questionnaire, including special missing-value conventions.
- Confirm whether segment_weight is appropriate for household and crop estimates, and identify strata/cluster definitions. Provisional weighted indicators are exported separately; they are not certified national estimates.
- Restrict crop-specific questions to the correct eligible population and audit skip patterns.
- Validate land-area definitions and crop/season linkages before computing yields. No yield estimates or treatment-effect claims are made here.
- Investigate outliers and zero-loss reporting, quantify uncertainty, and validate geographic comparisons.
- Keep household identifiers and row-level microdata out of a public app/repository; confirm the dataset's release terms.

## Deliverables
- data_inventory.json: file dimensions, variable labels, answer codes, missing counts, frequent values.
- variable_dictionary.txt: readable dictionary.
- key_indicators.csv: numerators, denominators, sample percentages and provisional weighted percentages.
- soil_support_by_district.csv: aggregate exploratory district comparisons.
- crop_loss_summary.csv: crop-level descriptive loss indicators across the two seasons.
