## Context Summary: Issue #2 — Stop tracking an activity

### Issue
- **State:** Open
- **Labels:** enhancement
- **Milestone:** None

### What the issue asks for
When the live timer is running (started via issue #1), the user sees a stop option. Accepting it ends the session and saves the elapsed time as a progress entry, then confirms the saved duration.

### Linked issues
- **#1** (Start tracking an activity) — this issue extends the live timer screen built there.

### Images
None.

### Codebase findings

| Area | Detail |
|------|--------|
| Relevant files | `cli/start.js` — `startLiveTimer`, `attachSigint`, `printElapsed` all need modification; `core/duration.js` — `formatDuration` reused for confirmation message |
| Current stop mechanism | `attachSigint` handles Ctrl+C — closes connection and exits without saving anything |
| Progress entry domain | CLAUDE.md defines: activityId, date (YYYY-MM-DD), duration (integer minutes) |
| Test framework | `node:test` + hand-rolled in-memory mock |
| Collections constraint | No new collections without prior approval — `progress` collection will be needed; needs decision |

### Initial observations
1. **Progress collection:** Saving a progress entry requires a `progress` collection (per CLAUDE.md domain model). This is a new collection — needs explicit approval before proceeding.
2. **Stop trigger:** Currently the timer shows "(Ctrl+C to stop)". Ctrl+C (SIGINT) is the natural stop mechanism and already wired — just needs to save before exiting rather than exit bare.
3. **`cli/start.js` is the only file that needs changing** — the stop logic lives inside `attachSigint`; it just needs to insert a progress entry and print confirmation before closing.
