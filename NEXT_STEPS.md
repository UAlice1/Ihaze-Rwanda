# Development status

## Working first release
The static dashboard runs from dist/index.html, including under file://. All 30 districts and 23 crop aggregates are included. No raw household data, secrets, or external UI dependencies are shipped. Open AgriInsight.cmd opens the application in the user's default browser when the user launches it.

## Next implementation phase
1. Independently validate the extraction and weighting using the survey's official questionnaire/report and SPSS/pyreadstat.
2. Expanded input, finance and crop/season production comparisons are now in Inputs & research. Validate questionnaire eligibility and season alignment, then assess confounding before adjusted analyses. No verified crop-area variable has been identified; do not label recorded quantities as yields.
3. FastAPI adapter and server-side OpenAI endpoint are implemented. Install adapter dependencies and perform real integration testing; the standard-library backend already passes local HTTP tests. Configure a server-side API key/model to verify live AI.
4. PostgreSQL snapshot schema/import/read support is implemented. Test it against a real database before relying on it. CSV-backed operation remains the tested default.
5. The interface has been migrated to Next.js App Router, React and Tailwind CSS in frontend/. Production build and API proxy checks are recorded in the migration release. Visual/browser QA remains pending.
6. Define and validate a prediction task before adding machine learning. Separate households across train/test partitions and prevent outcome leakage.
7. Browser QA across desktop and mobile. Browser permission was declined during this run, so code-level checks do not establish visual correctness.
8. Complete dataset citation, public GitHub/public hosting, participant details and the <=3-minute demo recording before submission.
