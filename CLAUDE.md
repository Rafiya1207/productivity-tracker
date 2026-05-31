# Productivity Tracker

A personal CLI tool for tracking activities and recording progress over time.
Solo project — no auth, no multi-user concerns.

---

## Commands

```bash
# Run the app
node index.js health
node index.js register "Activity Name"

# Run all tests
node --test

# Run a single test file
node --test test/register.test.js
```

---

## Domain model

**Activity** — top-level entity. Represents work to track (e.g. "Learn Python", "Exercise").
Activities are never completed or archived; they accumulate history indefinitely.

**Progress entry** — a single record of work done on an activity. Contains exactly:
- `activityId` — reference to the parent activity
- `date` — date work happened (`YYYY-MM-DD`; not necessarily today)
- `duration` — time spent, stored as integer minutes

**Activity history** — progress entries for an activity, sorted by date descending.

No other entities. Do not add fields (notes, tags, mood, status, goals) without being asked.

---

## Architecture

CLI-first. Command routing in `index.js`; no CLI framework.

Three layers:

- **`cli/`** — command handlers; wire DB + core logic; own all I/O and error messaging
- **`core/`** — pure business logic; no DB calls; fully testable with mock collections
- **`database/`** — `connectToDatabase()` / `closeConnection()` via MongoDB native driver; `config/env.js` loads `MONGODB_URI` via dotenv

Tests use Node.js built-in `node:test` with a hand-rolled in-memory collection mock — no real DB required.

Planned but not yet implemented: `start`/`stop` session tracking, duration calculation, VegaLite dashboard in `/dashboard`.

---

## Behaviour rules

- Duration stored as integer minutes. Display as `Xh Ym` when ≥ 60 min, `Xm` otherwise.
- Dates stored as `YYYY-MM-DD` strings. No timestamps, no timezones.
- Duration arithmetic (summing totals, computing totals per activity) lives in a dedicated utility — not scattered across handlers.
- Ask before introducing any new dependency.
- Ask before creating or modifying database collections/indexes.
- Build one feature per iteration; stop when the requested scope is complete.

---

## Code conventions

- Plain JavaScript only — no TypeScript, no Mongoose, no Commander.js
- MongoDB native driver only
- Arrow functions over `function` declarations
- `async/await` throughout; semicolons always
- Functions must not exceed 15 lines; no nested functions
- `camelCase` for variables/functions; `kebab-case` for file names
- Colocate tests with source files where possible (`foo.js` → `foo.test.js`)

---

## Environment

Copy `.env.example` to `.env`.
Default: `MONGODB_URI=mongodb://127.0.0.1:27017/productivity-tracker`

---

## Out of scope (do not build)

- Authentication or user accounts
- Goals, targets, or streaks (unless explicitly requested)
- Notifications, reminders, cloud sync
- AI features, teams, complex dashboards
- TypeScript or any build step