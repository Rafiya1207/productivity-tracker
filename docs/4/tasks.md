# Tasks: View stats dashboard (#4)

## Task 1: Data aggregation utility

**Description**
Create `core/dashboard.js` with `aggregateProgress(entries, activities)` — a pure function that joins progress entries with activity names, groups by activity+date, sums duration per day, and adds `day` (e.g. "Mon") and `week` (e.g. "2026-W22") calendar fields.

**Acceptance Criteria**
- [ ] Groups entries by activityId + date, summing duration
- [ ] Joins activityId to activity name
- [ ] Each record has: activityName, date, duration, day (3-letter weekday), week (ISO year-week)
- [ ] Returns records sorted by date ascending
- [ ] Returns empty array when no entries provided

**Files Likely Affected**
- `core/dashboard.js` — new
- `core/dashboard.test.js` — new

**Test Requirements**
- Unit: single entry, multiple entries on same day (summed), entries across activities, empty input

**Dependencies**
- None

**Estimated Complexity:** M

---

## Task 2: HTML template generator

**Description**
Create `dashboard/template.js` with `buildHtml(chartsByActivity)` — takes the aggregated data grouped by activity name, returns a complete HTML string with one VegaLite chart div per activity, VegaLite loaded via CDN, and data embedded as JSON.

**Acceptance Criteria**
- [ ] Returns a valid HTML string with a `<div>` container per activity
- [ ] VegaLite and Vega loaded from CDN
- [ ] Aggregated data embedded as inline JSON
- [ ] Inline script renders one bubble chart per activity (x=week, y=day, size=duration)
- [ ] Days with no data produce no circle

**Files Likely Affected**
- `dashboard/template.js` — new

**Test Requirements**
- Unit: output contains expected activity name, contains VegaLite CDN URL, contains embedded data

**Dependencies**
- None (independent of Task 1)

**Estimated Complexity:** M

---

## Task 3: CLI handler and router wiring

**Description**
Create `cli/dashboard.js` that connects to MongoDB, fetches activities + progress entries, calls aggregateProgress and buildHtml, writes `dashboard/index.html`, and opens it in the browser. Wire `dashboard` into `index.js`.

**Acceptance Criteria**
- [ ] `node index.js dashboard` generates `dashboard/index.html` and opens it
- [ ] Prints "No data to display." and exits if no progress entries exist
- [ ] Prints the file path if the browser open command fails
- [ ] Help text updated to list `dashboard`

**Files Likely Affected**
- `cli/dashboard.js` — new
- `index.js` — add case and import

**Test Requirements**
- No unit tests (thin wiring + I/O); manual smoke test

**Dependencies**
- Depends on Task 1 and Task 2

**Estimated Complexity:** S
