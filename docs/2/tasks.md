# Tasks: Stop tracking an activity (#2)

## Task 1: Progress save utility

**Description**
Create `core/progress.js` with a pure `saveProgress(activityId, date, duration, collection)` function that inserts a progress entry and returns it. Add tests in `core/progress.test.js`.

**Acceptance Criteria**
- [ ] Inserts a document with `activityId`, `date`, and `duration` into the collection
- [ ] Returns the inserted document
- [ ] Duration is stored as an integer

**Files Likely Affected**
- `core/progress.js` — new
- `core/progress.test.js` — new

**Test Requirements**
- Unit: happy path inserts correct fields; verify returned document matches input

**Dependencies**
- None

**Estimated Complexity:** S

---

## Task 2: Stop keypress handler and timer update

**Description**
Modify `cli/start.js` to: (1) update the timer prompt to show `Press S to stop`; (2) replace `attachSigint` with `attachStopKey` that enables stdin raw mode, listens for 'S' to stop-and-save and `\x03` to cancel; (3) pass the full activity object into `startLiveTimer` so `_id` is available for the progress entry.

**Acceptance Criteria**
- [ ] Timer line shows `(Press S to stop)` instead of `(Ctrl+C to stop)`
- [ ] Pressing 'S' stops the interval, saves a progress entry, prints `Saved Xm for "<name>"`, closes DB, exits
- [ ] Pressing Ctrl+C exits without saving and prints `Tracking cancelled.`
- [ ] stdin raw mode is restored before exit in all paths
- [ ] Duration rounds up to 1 minute minimum

**Files Likely Affected**
- `cli/start.js` — modify

**Test Requirements**
- Unit: elapsed-to-duration rounding (sub-minute → 1m) via `core/duration.js`
- The keypress loop and stdin handling are not unit-tested; manual verification only

**Dependencies**
- Depends on Task 1 (`saveProgress`)

**Estimated Complexity:** M
