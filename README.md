# Field Sales AI Assistant FMCG

Modern internal web/PWA prototype for Dr. Oetker FMCG field sales reps and sales managers.

The product is intentionally focused on the operational execution layer:

- Sales reps see recommended visits, daily route context, store detail, visit checklists, and a mock AI assistant.
- Managers see lightweight execution KPIs, a Power BI embedded report placeholder, and a mock AI assistant.
- Databricks is modeled as the future data foundation and intelligence layer.
- Power BI is modeled as the future reporting and dashboarding layer.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Mock service layer and mock data
- Vercel-ready project structure
- Corporate internal-tool visual system inspired by Dr. Oetker blue, light surfaces, and restrained red accents

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000/login`.

Useful validation commands:

```bash
npm run lint
npm run build
```

## Deployment Notes

Target GitHub repository:

```text
https://github.com/ruseremian/field_sales_ai_assistant
```

Target Vercel project:

```text
https://vercel.com/ruslan-eremian-s-projects/field_sales_ai_assistant_fmcg
```

Production URL:

```text
https://fieldsalesaiassistantfmcg.vercel.app/
```

If the Vercel project is connected to the GitHub repository, pushing to `main` should trigger a Vercel deployment automatically.

If it is not connected yet:

1. Open the Vercel project settings.
2. Connect the GitHub repository `ruseremian/field_sales_ai_assistant`.
3. Use the default Next.js build settings.
4. Set build command to `npm run build`.
5. Set install command to `npm install`.
6. Deploy from the selected production branch.

Recommended Vercel settings:

- Framework Preset: Next.js
- Root Directory: repo root
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: leave default for Next.js

The repository also includes `vercel.json` with explicit Next.js framework, install, and build settings so Git-triggered deployments do not fall back to the generic `Other` preset.

## Google Maps Setup

The route page can use Google Maps for real driving route visualization from the existing mock store coordinates.

1. Create a Google Maps API key in Google Cloud.
2. Enable the Maps JavaScript API.
3. Enable the Directions API for the current client-side DirectionsService implementation. If route calculation later moves server-side, enable the Routes API as needed.
4. Add the key locally in `.env.local`:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-key-here
NEXT_PUBLIC_MAP_PROVIDER=google
```

5. Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in Vercel environment variables.
6. Redeploy after changing Vercel environment variables.
7. Restrict the API key by HTTP referrer:

```text
http://localhost:3000/*
https://fieldsalesaiassistantfmcg.vercel.app/*
```

If the key is missing or Google route calculation fails, the app falls back to the internal mock route map and mock route summary.

## Vercel 404 Fix

The app structure was valid, but the production root URL returned `404: NOT_FOUND`.

Two safeguards were added:

- `app/page.tsx` now renders the login/workspace selector directly instead of relying on a redirect to `/login`.
- `vercel.json` explicitly declares the project as Next.js and uses `npm install` plus `npm run build`.

The project is linked locally to:

```text
projectName: field_sales_ai_assistant_fmcg
projectId: prj_eDzuOUif6E4JAsVKUCeelSweonnd
```

The app is at repository root, so the Vercel root directory should remain the repo root.

## Current MVP Architecture

This version uses only mock data and local UI state.

```text
iPad/iPhone/Desktop
-> Next.js PWA prototype
-> mock service layer
-> mock Databricks curated marts
-> mock Power BI embed config
-> mock assistant answers
```

There is no real authentication, database, Databricks connection, Power BI connection, route API, or OpenAI API call yet.

## App Screens

- `/login` fake role selection for Sales Rep or Manager
- `/rep` sales rep home page
- `/rep/visits` recommended store visits
- `/rep/route` mocked optimized route with map placeholder
- `/rep/stores/[storeId]` store detail, performance, ROI, checklist, and notes
- `/manager` KPI summary and Power BI embed placeholder
- `/assistant` mock chat-style assistant

## UI Direction

The interface uses a polished internal enterprise style with:

- desktop sidebar navigation
- mobile bottom navigation
- responsive cards and route panels
- polished Power BI and map placeholders
- priority and status badges
- touch-friendly iPad/iPhone layouts
- Dr. Oetker-inspired corporate blue, white, light grey-blue surfaces, and restrained red accents

## Service Layer

The app separates future integration boundaries in `lib/services`:

- `databricksService.ts` simulates curated Databricks marts.
- `routeOptimizationService.ts` returns a mocked route and documents future routing logic.
- `powerbiService.ts` contains embed config placeholders and TODOs.
- `assistantService.ts` returns grounded mock answers and documents future OpenAI plus Databricks integration.
- `visitService.ts` models operational visit status and checklist state.
- `storeService.ts` provides store and recommendation access.

## Future Databricks Integration

Databricks should remain the analytical data foundation and recommendation intelligence layer.

Future approved marts include:

- `mart_route_candidates`
- `mart_visit_recommendations`
- `mart_store_performance`
- `mart_visit_roi`
- `mart_rep_performance`
- `mart_promo_roi`
- `mart_sales_trends`
- `mart_visit_completion`

The app/backend should read curated marts through a controlled service layer, not raw tables.

## Future Power BI Embedded Integration

Power BI should handle dashboards and manager reporting. The app should embed reports rather than recreate a dashboard builder.

Future work:

- Configure workspace, report, dataset, and embed URL from environment variables.
- Generate access tokens and embed tokens.
- Decide embed for organization vs embed for customers.
- Apply row-level security.
- Map app users to Power BI identities.

## Future Backend

A FastAPI backend can be added later for:

- Databricks SQL Warehouse access
- Power BI embed token generation
- Route optimization orchestration
- AI assistant orchestration
- Operational app APIs

Operational state such as users, roles, route plans, visit status, notes, checklist completion, settings, and preferences can live in PostgreSQL/Supabase.

## Future Route Optimization

Route optimization should not mean shortest route only. Future logic should combine:

- priority score
- sales opportunity
- last visit date
- store opening hours
- rep working hours
- visit duration
- travel time
- mandatory visits
- optional visits

Potential engines include Mapbox Optimization API, Google Maps APIs, and Google OR-Tools.

## Future AI Assistant

The assistant should use OpenAI through a backend service and retrieve context from approved Databricks marts and validated metrics.

It should not freely query raw Databricks tables. Role-based access and a controlled semantic layer are required before production use.
