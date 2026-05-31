class DuplicateActivityError extends Error {
  constructor(name) {
    super(`Activity "${name}" already exists.`);
    this.name = "DuplicateActivityError";
  }
}

class ActivityNotFoundError extends Error {
  constructor(name) {
    super(`Activity "${name}" not found.`);
    this.name = "ActivityNotFoundError";
  }
}

class DatabaseConnectionError extends Error {
  constructor() {
    super("Unable to connect to MongoDB. Check your MONGODB_URI setting.");
    this.name = "DatabaseConnectionError";
  }
}

module.exports = {
  DuplicateActivityError,
  ActivityNotFoundError,
  DatabaseConnectionError,
};
