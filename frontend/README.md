# Ihaze Rwanda - Next.js Frontend

*"Ihaze" means "enough" in Kinyarwanda - toward food security and sufficiency*

React 19, Next.js 16 App Router and Tailwind CSS 4. This replaces the original plain-JavaScript dashboard. It preserves overview, district/crop searches, exports, support scenarios, evidence lookup and optional AI explanations.

## Start

From this frontend directory:

```powershell
npm ci
npm run build
npm start
```

Open http://127.0.0.1:3000 . Use `npm run dev` during development. Node 20.9 or later is required by Next.js. The Windows launcher `../Start Next.js.cmd` uses installed dependencies and an existing production build when available.

In a second terminal, from the parent project directory:

```powershell
python -m backend.server --port 8765
```

The Next.js server proxies `/api/*` to `http://127.0.0.1:8765/api/*`. To use a different Python API origin, set AGRI_API_ORIGIN before building/starting Next.js. Set AGRI_FRONTEND_ORIGIN on the Python server if the browser origin differs from http://127.0.0.1:3000. The same-origin Next proxy avoids requiring browser CORS access.

If the backend is unavailable, the UI labels itself “Aggregate snapshot mode,” uses the packaged aggregate tables, and retains local evidence lookup. It does not claim a server-backed planner or live AI in that mode.

## Structure

- app/layout.jsx: document metadata and global Tailwind import.
- app/page.jsx: server entry rendering the client dashboard with approved aggregates.
- components/Dashboard.jsx: React views and state, backend health checks, planner/evidence requests and CSV exports.
- data/snapshot.json: aggregate district/crop evidence only, no household identifiers.
- postcss.config.mjs: Tailwind PostCSS integration.
- next.config.mjs: server-side API proxy.

OPENAI_API_KEY belongs only on the Python server, never in a NEXT_PUBLIC variable. Live API calls remain optional and user selected. Historical period, denominators, source references, privacy and causal limits remain visible.

## Offline dependency installation used during development

The initial install used already cached npm packages with repaired request-header cache metadata in the workspace; no external downloads were authorized. The package-lock records the actual installed dependencies. On another machine use `npm ci` with normal registry access. Offline cache tooling is development scratch work and is not needed by the app.

## Verification

`npm run build` completed successfully. With both servers running, `python smoke_test.py` verifies the prerendered dashboard, compiled Tailwind CSS, JavaScript assets, and GET/POST requests through the Next.js API proxy. Eight Python backend tests passed as well. These checks do not replace visual/browser-interaction testing, which remains unverified.
