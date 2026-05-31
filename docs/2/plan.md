# Plan: Stop tracking an activity (#2)

## Objective
Extend the live timer so pressing 'S' stops the session, saves a progress entry to MongoDB, prints a confirmation with the saved duration, and exits cleanly.

## Scope
### In Scope
- Change timer prompt from `(Ctrl+C to stop)` to `(Press S to stop)`
- Capture 'S' keypress via `process.stdin` in raw mode (no new dependencies)
- On stop: compute elapsed minutes, save a progress entry (`activityId`, `date`, `duration`) to the `progress` collection, print confirmation, close DB, exit
- Pure `saveProgress(activityId, date, duration, collection)` function in `core/progress.js`, with tests
- Handle Ctrl+C gracefully in raw mode (exit without saving, print "Tracking cancelled.")

### Out of Scope
- Any new CLI commands
- New npm dependencies
- Viewing or querying progress entries (future issues)

## Approach
`cli/start.js` is modified to pass the full activity object (including `_id`) into the timer. `attachSigint` is replaced by `attachStopKey`, which sets `process.stdin` to raw mode and listens for data events. On 'S': clears interval, restores stdin, saves the progress entry via `saveProgress`, prints `Saved Xm for "<name>"`, closes DB, and exits. On Ctrl+C (byte `\x03`): exits without saving. The save logic lives in `core/progress.js` as a pure function testable with a mock collection.

## Affected Areas
| Area | Files | Change Type |
|------|-------|-------------|
| Progress core logic | `core/progress.js` | Add |
| Progress tests | `core/progress.test.js` | Add |
| CLI timer handler | `cli/start.js` | Modify |

## Assumptions
1. [ASSUMPTION] `date` is the date when the user presses S (today's date in YYYY-MM-DD).
2. [ASSUMPTION] Duration less than 1 minute rounds to 1 minute (not 0).
3. [ASSUMPTION] Ctrl+C exits without saving and prints `Tracking cancelled.`

## Open Questions (resolved)
| # | Question | Answer |
|---|----------|--------|
| 1 | Progress collection approved? | Yes |
| 2 | activityId field? | MongoDB `_id` of the activity |
| 3 | Progress entry fields? | activityId, date (YYYY-MM-DD), duration (integer minutes) |
| 4 | Stop trigger? | 'S' keypress via stdin raw mode |

## Risks & Mitigations
| Risk | Mitigation |
|------|-----------|
| stdin raw mode left enabled on error | Restore stdin in all exit paths |
| Sub-minute sessions stored as 0 | Round up to 1 minute minimum |
