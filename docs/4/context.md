## Context Summary: Issue #4 — View stats dashboard

### Issue
- **State:** Open
- **Labels:** enhancement
- **Milestone:** None

### What the issue asks for
A `dashboard` command that generates a VegaLite calendar bubble chart per activity and opens it in the browser. Rows = Mon–Sun, columns = weeks. Columns = weeks. Each day with logged time shows a circle scaled by total duration; days with no data show nothing.

### Linked issues
- **#2** (Stop tracking) — created the `progress` collection this feature reads from.

### Images
None.

### Codebase findings

| Area | Detail |
|------|--------|
| Repo structure | `dashboard/` directory exists but is empty |
| Data sources | `progress` collection (activityId, date, duration); `activities` collection (_id, name) — need a join to get activity names |
| Duration utility | `core/duration.js` formatDuration available for tooltips |
| Test framework | `node:test` + hand-rolled mocks |
| Tech stack | Plain JS, MongoDB native driver — no frameworks |

### Initial observations
1. **VegaLite dependency:** CLAUDE.md mentions VegaLite as planned but also says "no new dependencies without prior approval." VegaLite can be loaded via CDN inside a generated HTML file — no npm package needed. Needs confirmation.
2. **Browser opening:** Node's built-in `child_process.exec` with `open` (macOS) / `xdg-open` (Linux) / `start` (Windows) can open the HTML file — no new dependency.
3. **Data aggregation:** Progress entries must be grouped by activity and summed per day before building the VegaLite spec. This pure logic belongs in `core/`.
4. **Activity name lookup:** `progress` stores `activityId` (MongoDB `_id`); a join with `activities` is needed to display names in the chart.
5. **One HTML file per activity** or **one file with all charts** — needs a decision.
