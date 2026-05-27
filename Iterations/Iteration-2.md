# Iteration 2 — Register Activity Command

Use the existing `copilot-instructions.md` as the primary project context.

Goal:
Implement activity registration from the CLI.

Requirements:

* create `register` command
* save activity information into MongoDB
* prevent duplicate activity names
* validate empty activity names
* add basic tests
* add proper error handling

Expected behavior:

```bash id="g9v0l2"
node index.js register "Viz"
```

should:

* create a new activity
* save it in MongoDB
* print success message

If activity already exists:

```bash id="02hjcc"
node index.js register "Viz"
```

should:

* not create duplicate entry
* print readable error message

If activity name is missing:

```bash id="a6ulv0"
node index.js register
```

should:

* fail gracefully
* print validation message

Suggested activity document:

```json id="i49g6n"
{
  "name": "Viz",
  "createdAt": "timestamp"
}
```

Testing requirements:

* add tests for successful registration
* add tests for duplicate activity handling
* add tests for empty input validation
* tests should be runnable locally

Error handling requirements:

* handle MongoDB connection failures
* handle invalid CLI input
* avoid unhandled promise rejections
* return readable terminal messages

Constraints:

* plain JavaScript only
* no Commander.js
* no Mongoose
* keep implementation simple
* no session tracking yet
* no charts
* no analytics
* no update/delete operations

Provide:

* files to create/update
* code changes
* test files
* test commands
* MongoDB collection setup
* short explanation only

Stop after activity registration works successfully.
