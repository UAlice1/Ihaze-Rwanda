# Ihaze Rwanda - Backend Setup 🌾

## Run now, no dependency installation

Double-click `Start Backend.cmd` on this Windows computer, leave the terminal open, and open **http://127.0.0.1:8765** in your browser. Alternatively, from the project directory:

```powershell
python -m backend.server
```

This serves the API from the local development server. Stop with Ctrl+C. It binds only to localhost and is intended for development, not public deployment.

For the primary Next.js interface, also start `Start Next.js.cmd` and use http://127.0.0.1:3000. Next.js proxies its /api requests to this backend. Port 8765 serves the API and legacy static dashboard (`dist/index.html` with local evidence lookup). The backend accepts requests from the configured Next.js origin (AGRI_FRONTEND_ORIGIN, default http://127.0.0.1:3000).

## Optional FastAPI

```powershell
python -m pip install -r requirements.txt
python -m uvicorn backend.fastapi_app:app --host 127.0.0.1 --port 8765
```

FastAPI provides the same service functions plus OpenAPI documentation at `/docs`. The adapter has not been run in this environment because its dependencies are unavailable. Package version ranges are not a reproducible lockfile; lock installed versions before final deployment.

## Live OpenAI explanations

Set server environment variables before starting the backend:

```powershell
$env:OPENAI_API_KEY = '<your own key>'
$env:OPENAI_MODEL = '<model available to your API project>'
python -m backend.server
```

Do not put a key in source control or frontend code. No key is included in the project. Select “Use AI to explain the evidence” on the assistant page to use it. Otherwise the backend returns deterministic lookup results. AI requests send the question and a selected aggregate evidence packet to `https://api.openai.com/v1/responses`. They use server instructions, an output limit, and `store:false`. Do not enter personal information. The application does not claim that this setting eliminates all provider retention.

AI output is labelled and displayed with the original evidence for verification; prompt grounding is not a guarantee of numerical accuracy. Unsupported topics are rejected before making a model request. Missing configuration returns HTTP 503; timeout/upstream errors return HTTP 502 without a silent AI substitution. Paid live calls were not made during development. Mocked request/response and failure paths were tested.

Implementation reference: https://developers.openai.com/api/docs/guides/text

## Optional PostgreSQL

Without AGRI_DATABASE_URL the service reads versioned CSV aggregates. To use PostgreSQL, install requirements, create a database you control, and set the connection string in the server environment:

```powershell
$env:AGRI_DATABASE_URL = 'postgresql://USER:PASSWORD@HOST:5432/DATABASE'
python -m backend.database
python -m backend.server
```

The import transaction creates the schema and upserts three aggregate tables under dataset version `agricultural-2017-v1`. It never imports raw survey files. On connection failure, endpoints return an explicit error rather than silently changing data sources. A real PostgreSQL instance was not available for integration testing; database functions are implemented but not end-to-end verified.

## API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | /api/health | Server and AI configuration status; no secrets |
| GET | /api/metadata | Period, weighting and limitations |
| GET | /api/research | Expanded aggregate research and structural audit |
| GET | /api/indicators | Descriptive indicator counts and denominators |
| GET | /api/districts?q=Gakenke&sort=share | Filter districts; sort share/gap/name |
| GET | /api/crops | Crop-season aggregate losses |
| POST | /api/plan | JSON district, integer capacity, optional require_no_extension boolean and barrier: any/finance/knowledge/labour/tenure |
| POST | /api/ask | JSON question and mode: lookup or ai |

Responses include metadata and sources. `/api/plan` describes coverage of historical sample cases, not operational benefit eligibility. The indicator endpoint omits provisional weighted estimates.

Expanded research is served from the aggregate research.json file, separately from the optional three-table PostgreSQL snapshot store. Reproduce it with `python analysis/research.py --data-root <authorized-analysis-directory> --output research.json` after initial extraction. The input directory must have spss/, work/ pickles, and outputs/data_inventory.json from analyze.py. Generate its report with `python analysis/research_report.py research.json research_report.md`. Copy both aggregate JSON and report to the frontend data/public folders and rebuild Next.js after changing the research snapshot.

## Checks

```powershell
python -m unittest backend.test_service -v
node check.cjs
node --check dist/backend.js
```

Before deploying to production with AI enabled, implement:
- Authentication and access control
- API spending limits and rate controls  
- Production server configuration (e.g., gunicorn, nginx)
- Request logging and monitoring
- Secure environment variable management

This development setup does not include production-grade controls.
