# Tasks: Start tracking an activity (#1)

## Task 1: Duration formatting utility

**Description**
Create `core/duration.js` with a pure `formatDuration(minutes)` function that converts integer minutes to the display format defined in CLAUDE.md. Add tests in `core/duration.test.js`.

**Acceptance Criteria**
- [ ] `formatDuration(0)` → `"0m"`
- [ ] `formatDuration(45)` → `"45m"`
- [ ] `formatDuration(60)` → `"1h 0m"`
- [ ] `formatDuration(90)` → `"1h 30m"`
- [ ] Function is exported and importable from other modules

**Files Likely Affected**
- `core/duration.js` — new file
- `core/duration.test.js` — new file

**Test Requirements**
- Unit: all four cases above plus a negative/zero edge case
- No integration tests needed (pure function)

**Dependencies**
- None

**Estimated Complexity:** S

---

## Task 2: Start CLI handler

**Description**
Create `cli/start.js` that looks up an activity by name, then runs a `setInterval` printing a live elapsed timer to stdout using `\r`. Handles SIGINT to close the DB connection cleanly.

**Acceptance Criteria**
- [ ] Throws if activity name is blank
- [ ] Throws with a clear message if the activity is not found in the DB
- [ ] Prints `Tracking "<name>" — 0m  (Ctrl+C to stop)` immediately on start
- [ ] Updates the same line every second with the current elapsed time
- [ ] On SIGINT, clears the interval, closes the DB connection, and exits cleanly

**Files Likely Affected**
- `cli/start.js` — new file

**Test Requirements**
- Unit: blank name and not-found errors (mock the collection)
- The live timer loop is not unit-tested (side-effectful I/O); manual verification only

**Dependencies**
- Depends on Task 1 (`formatDuration`)

**Estimated Complexity:** M

---

## Task 3: Wire `start` command in router

**Description**
Add a `start` case to the `switch` in `index.js` that calls `runStart` from `cli/start.js`.

**Acceptance Criteria**
- [ ] `node index.js start "Learn Python"` routes to `runStart`
- [ ] Help text updated to list the `start` command
- [ ] No other existing commands affected

**Files Likely Affected**
- `index.js` — add case and import

**Test Requirements**
- None (routing is trivially thin; covered by manual smoke test)

**Dependencies**
- Depends on Task 2

**Estimated Complexity:** S
