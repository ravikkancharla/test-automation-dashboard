# Test Automation Dashboard

A local prototype dashboard, built with **React + TypeScript** (Vite), for
tracking CI test run history: pass rate trends, flaky test detection, and
execution duration over time.

No backend, no database, no AWS account required. All run history is stored
in the browser via `localStorage`.

## Quick start

```bash
npm install
npm run dev      # http://localhost:8000 (alias: npm start)
```

Other scripts:

```bash
npm run typecheck   # tsc --noEmit
npm run build       # typecheck + production build into dist/
npm run preview     # serve the production build
```

## Project structure

```
src/
├── main.tsx             Entry point
├── App.tsx              Layout and wiring
├── types.ts             TestRun / TestResult / TestDefinition
├── constants.ts         TEST_SUITE, storage key, limits
├── hooks/useRuns.ts     Runs state synced to localStorage
├── lib/
│   ├── storage.ts       loadRuns / saveRuns (swap for a real API)
│   ├── simulate.ts      simulateRun (swap for real CI results)
│   └── metrics.ts       computeFlakyTests, averageDuration, fmtTime
├── components/          Header, StatGrid, TrendChart, RunHistory, Footer
└── styles/styles.css    Dark "ops console" theme
```

## How it works

- **"Simulate test run"** generates a run across a 15-test fixture suite
  (`TEST_SUITE` in `src/constants.ts`), each with a different flake probability.
- **Flaky detection**: a test is flaky if it shows both a pass and a fail
  within the last 5 runs - see `computeFlakyTests()` in `src/lib/metrics.ts`.
- **Run history** is stored under `testdash_runs_v1`, capped at 100 runs.
- **Charts** use Chart.js via `react-chartjs-2` for the 15 most recent runs.
- Click a row in the history table to expand per-test detail.

## Extending this to real data

| Module | Current behavior | Replace with |
|---|---|---|
| `simulateRun()` in `src/lib/simulate.ts` | Random pass/fail results | Parse real CI results (e.g. Playwright/pytest JSON) |
| `loadRuns()` / `saveRuns()` in `src/lib/storage.ts` | `localStorage` | Fetch from / POST to a real API |

## Migration path to AWS

```
CI pipeline -> S3 / API Gateway -> Lambda (metrics) -> DynamoDB or RDS
  -> API Gateway + Lambda REST API
  -> this React app (S3 + CloudFront) fetches and displays
```

## Notes

- Chart.js is bundled from npm; the Google Fonts still load from a CDN.
- Opening `index.html` directly no longer works; use `npm run dev` or serve `dist/`.
