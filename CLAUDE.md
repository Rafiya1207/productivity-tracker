# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

## Architecture

The app is a CLI-first productivity tracker. Command routing lives in `index.js`; no CLI framework is used.

Three distinct layers:

- **`cli/`** — command handlers that wire together DB and core logic; handle I/O and error messaging
- **`core/`** — pure business logic functions; no DB calls, fully testable with mock collections
- **`database/`** — `connectToDatabase()` / `closeConnection()` using the MongoDB native driver; `config/env.js` loads `MONGODB_URI` via dotenv

Tests use Node.js built-in `node:test` with a hand-rolled in-memory collection mock — no real DB required.

Planned but not yet implemented: `start`/`stop` session tracking, duration calculation, VegaLite dashboard in `/dashboard`.

## Constraints

- Plain JavaScript only — no TypeScript, no Mongoose, no Commander.js
- MongoDB native driver only
- Functions must not exceed 15 lines; no nested functions
- Arrow functions over `function` declarations
- `async/await` throughout; semicolons always
- Do not implement: authentication, cloud sync, notifications, AI features, teams, complex dashboards
- Build one feature per iteration; stop when the requested scope is complete

## Environment

Copy `.env.example` to `.env`. Default: `MONGODB_URI=mongodb://127.0.0.1:27017/productivity-tracker`
