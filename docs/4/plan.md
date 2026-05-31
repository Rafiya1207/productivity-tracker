# Plan: View stats dashboard (#4)

## Objective
A `dashboard` command that reads all progress entries from MongoDB, aggregates duration per activity per day, generates a single `dashboard/index.html` with one VegaLite calendar bubble chart per activity using plain HTML + JS, and opens it in the browser.

## Scope
### In Scope
- `node index.js dashboard` command
- Data aggregation: group progress entries by activity + date, sum duration per day
- One VegaLite calendar bubble chart per activity (rows = Mon–Sun, columns = weeks, circle size = duration)
- Days with no data show no circle
- Single `dashboard/index.html` — plain HTML/JS, VegaLite loaded via CDN, data embedded as JSON
- Browser opened via `child_process.exec` (`open` / `xdg-open` / `start`)

### Out of Scope
- Authentication, filtering by date range
- New npm packages
- React or any frontend framework

## Approach
`cli/dashboard.js` connects to MongoDB, fetches all activities and progress entries, calls `core/dashboard.js` to aggregate them into `{activityName, date, duration, day, week}` records (grouped by activity+date, duration summed). It then calls `dashboard/template.js` to render a plain HTML string — a self-contained page with a `<div>` per activity, VegaLite loaded from CDN, and the aggregated data embedded as JSON that a small inline `<script>` iterates to render each chart. The file is written to `dashboard/index.html` and opened in the browser.

## Affected Areas
| Area | Files | Change Type |
|------|-------|-------------|
| Data aggregation | `core/dashboard.js` | Add |
| Aggregation tests | `core/dashboard.test.js` | Add |
| HTML template | `dashboard/template.js` | Add |
| CLI handler | `cli/dashboard.js` | Add |
| Command router | `index.js` | Modify |

## Assumptions
1. [ASSUMPTION] Output written to `dashboard/index.html`, overwritten each run.
2. [ASSUMPTION] Week column label is the ISO year-week string (e.g. 2026-W22).
3. [ASSUMPTION] Day row order is Mon → Sun (top to bottom).
4. [ASSUMPTION] Browser opened with `open` on macOS, `xdg-open` on Linux, `start` on Windows.
5. [ASSUMPTION] If no progress entries exist, CLI prints "No data to display." and exits without opening a browser.

## Risks & Mitigations
| Risk | Mitigation |
|------|-----------|
| CDN unavailable | Charts won't render; acceptable for a local dev tool |
| `open` command not found on some Linux distros | Wrap in try/catch; print the file path so user can open manually |
