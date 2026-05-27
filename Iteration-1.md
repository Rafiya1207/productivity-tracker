# Iteration 1 — Project Setup

Use the existing `instructions.md` as the primary project context.

Goal: Set up the initial project structure and development environment.

Requirements:

- initialize Node.js project
- create folder structure
- configure dotenv
- configure MongoDB native driver connection
- create CLI entry point
- create basic `health` command

Expected behavior:

```bash id="0ng2ik"
node index.js health
```

should:

- start successfully
- connect to MongoDB
- print success message

Suggested folders:

```text id="q7gd1v"
/cli
/core
/database
/dashboard
/config
```

Constraints:

- plain JavaScript only
- no Commander.js
- no Mongoose
- no frontend
- no charts
- no session tracking
- no abstractions unless necessary

Provide:

- dependencies
- folder structure
- files to create
- code for each file
- setup commands
- run commands
- short explanation only

Stop after setup is complete.
