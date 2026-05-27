## Project Overview

This project is a CLI-first productivity tracking application.

Users start and stop work sessions from the terminal.
The application records session durations in MongoDB and visualizes productivity patterns using VegaLite in the browser.

The workflow should remain:

* minimal
* fast
* low friction
* iterative

---

## Tech Stack

### Core

* Node.js
* Plain JavaScript

### Database

* MongoDB native driver

### Visualization

* VegaLite

### Environment

* dotenv

### Runtime

* Shell commands

---

## Coding Guidelines

* Avoid Globals
* Keep implementations simple
* Avoid over engineering
* Prefer readable code over clever code
* Use arrow functions over general function definitions
* Avoid function inside function
* Functions should be pure and thoroughly tested
* Functions should not exceed 15 lines
* Use async/await
* Use semicolons consistently
* Use small focused modules
* Avoid premature optimization
* Build one feature at a time
* Every iteration must be testable immediately

### Response Style

* Be precise, not verbose
* Keep explanations short
* Avoid unnecessary architecture redesigns
* Implement only requested scope

---

## Project Structure

```text
/cli
  Command handling

/core
  Session logic

/database
  MongoDB connection and queries

/dashboard
  VegaLite visualization

/config
  Environment configuration
```

---

## Development Philosophy

* CLI-first
* Browser only for visualization
* Fast feedback loops
* Iterative development
* Minimal dependencies
* Local-first workflow

---

## Current Planned Features

* register project/task
* start session
* stop session
* calculate duration
* visualize activity

---

## Out of Scope

Do not implement:

* authentication
* cloud sync
* notifications
* AI features
* teams/collaboration
* complex dashboards
* unnecessary abstractions

---

## Environment

```bash
MONGODB_URI=<localhost>
```

---

## Commands Philosophy

Commands should remain simple.

Examples:

```bash id="1e0mzd"
focus register "Viz"
focus start "Viz"
focus stop
focus graph
```

---

## Agent Instructions

* Build incrementally
* Implement only the current iteration
* Stop after completing requested feature
* Do not implement future features
* Prefer modifying existing code over adding abstractions
* Provide test instructions
* Keep outputs concise
* Prioritize working functionality
