## Context Summary: Issue #1 — Start tracking an activity

### Issue
- **State:** Open
- **Labels:** enhancement
- **Milestone:** None

### What the issue asks for
Add a `start` CLI command that begins a timed session for an existing activity. While tracking, the CLI displays a live elapsed timer that updates in place. If the activity doesn't exist or a session is already active, an error is shown.

### Linked issues
None.

### Images
None.

### Codebase findings

| Area | Detail |
|------|--------|
| Repo structure | `index.js` (router), `cli/` (handlers), `core/` (pure logic), `database/` (MongoDB), `config/env.js` (dotenv) |
| Relevant files | `index.js` — command routing; `cli/register.js` — pattern for CLI handlers; `core/activity.js` — pattern for pure core logic; `database/connection.js` — DB connect/close |
| Test framework | Node.js built-in `node:test`, hand-rolled in-memory collection mock, tests colocated near source (`test/register.test.js`) |
| Tech stack | Plain JS, MongoDB native driver, dotenv — no frameworks |
| Relevant docs | `CLAUDE.md` notes `start`/`stop` as planned-but-not-implemented; no new deps or collections without approval |

### Initial observations
1. **Session state storage:** The "duplicate session" AC requires detecting an already-active session. Since the timer runs in-process, a session can only be detected within the same process. Persisting it to MongoDB (a `sessions` collection) would allow cross-run detection but needs prior approval per CLAUDE.md. This needs a decision before planning.
2. **Live timer display:** Can be achieved with `process.stdout.write` + `\r` (no dependencies). Works well in a terminal; no new packages needed.
3. **Stop action:** Issue #2 establishes that stop is triggered interactively from within the live timer screen — meaning start and stop are part of the same process/command.
4. **Existing pattern:** `cli/register.js` → `core/activity.js` establishes the CLI-to-core split to follow.
