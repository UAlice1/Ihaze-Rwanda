# 0.4.0

- Added reproducible expanded research with all-file structural audits, source checksums, household-key checks, explicit duplicate exclusions and no source-defined missing-value declarations found.
- Added six input-use rates, first-loan outcomes and a descriptive production comparison workspace with 181 comparisons meeting minimum yes/no group sizes.
- Added barrier-specific outreach planning for finance, knowledge, labour and tenure, with transparent overlap notes and suggested further assessment categories.
- Added a research API, generated aggregate research report, and new evidence-lookup topics.
- Independent SPSS-reader verification, survey-design validation, current targeting and causal/yield claims remain outside this release.

# 0.3.0

- Migrated all six dashboard sections to React components in the Next.js App Router.
- Replaced the primary frontend's stylesheet with compiled Tailwind CSS 4 utilities and theme tokens.
- Preserved district search/sorting, added crop search, maintained filtered CSV exports, planner validation and scenario export.
- Added Next.js API rewrites to the Python backend, online/snapshot status and backend-verified planning responses.
- Added source references, optional AI mode, unavailable-service handling and aggregate snapshot fallback in React.
- Added Start Next.js.cmd and frontend setup documentation. Port 3000 is the new frontend; port 8765 is the Python backend/legacy fallback.
- Installed dependencies entirely from local cached npm packages, with a package lock.
- Verified Next.js production build and HTTP smoke tests for prerendered content, compiled Tailwind styles, JavaScript assets and GET/POST API proxying. Eight backend tests passed, including the new frontend origin.
- Visual/browser interaction QA remains pending. Live AI requires server configuration and has not been called.

# 0.2.0

- Added a working standard-Python HTTP backend serving the frontend and aggregate-data API.
- Added validated district queries, crop/indicator endpoints and capacity-planning service.
- Added server-side OpenAI Responses integration, inactive unless server credentials/model are configured and the user selects AI mode.
- Added frontend connection detection, evidence sources, explicit failure states and the original evidence alongside model explanations.
- Added optional FastAPI adapter, PostgreSQL aggregate snapshot schema/import/read support and setup guide.
- Added a Windows backend launcher.
- Eight Python tests pass, including real local HTTP requests, invalid inputs, planner arithmetic, mocked OpenAI payload/failures and mocked database behaviour. JavaScript checks cover all original views and backend-aware assistant response/error rendering.
- No public deployment, paid AI call, real PostgreSQL integration test, or visual browser test has been completed. The initial statistical extraction remains pending independent verification.
