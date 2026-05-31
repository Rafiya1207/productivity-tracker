# Plan: Start tracking an activity (#1)

## Objective
Add a `start` command that looks up an existing activity by name and displays a live elapsed timer in the terminal, updating in place. The timer runs until the process is interrupted (Ctrl+C). Stop interaction is deferred to issue #2.

## Scope
### In Scope
- `node index.js start "<activity name>"` command routing
- Activity lookup — error if not found or name is blank
- Live elapsed timer, updating in place with `\r`
- Timer display shows elapsed time and a "Press Ctrl+C to stop" hint
- Duration formatting utility (`Xh Ym` / `Xm`) in `core/`
- Unit tests for the core duration formatting logic

### Out of Scope
- Stop keypress handling (issue #2)
- Saving a progress entry (happens on stop, issue #2)
- Duplicate session detection (skipped — single-user CLI, no cross-run tracking)
- Any new npm dependencies

## Approach
`cli/start.js` handles the command: connects to DB, looks up the activity, then starts a `setInterval` that writes the elapsed time to stdout using `\r` to update in place. The interval runs until the process exits (Ctrl+C). Duration formatting lives in `core/duration.js` as a pure utility, testable independently.

## Affected Areas
| Area | Files | Change Type |
|------|-------|-------------|
| Command router | `index.js` | Modify |
| CLI handler | `cli/start.js` | Add |
| Duration utility | `core/duration.js` | Add |
| Duration tests | `core/duration.test.js` | Add |

## Assumptions
1. [ASSUMPTION] No new collections needed — activity lookup uses the existing `activities` collection.
2. [ASSUMPTION] "Press Ctrl+C to stop" is the stop hint shown in the timer display (actual stop logic is issue #2).
3. [ASSUMPTION] DB connection stays open while the timer runs; `closeConnection` is called on process exit via `process.on('SIGINT')`.

## Open Questions (resolved)
| # | Question | Answer |
|---|----------|--------|
| 1 | Duplicate session detection? | Skipped — single-user CLI |
| 2 | Progress entry on start? | No — saved on stop (issue #2) |
| 3 | Stop keypress in this issue? | No — deferred to issue #2 |

## Risks & Mitigations
| Risk | Mitigation |
|------|-----------|
| DB connection left open on Ctrl+C | `process.on('SIGINT')` closes client before exit |
| Timer flicker on slow terminals | Use `\r` only, no screen clear |

## Status: Completed
Implemented in 3 tasks. All tests passing. Final commit: 85a949c.
