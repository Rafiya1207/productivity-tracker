const { connectToDatabase, closeConnection } = require(
  "../database/connection",
);
const { registerActivity } = require("../core/activity");
const { DuplicateActivityError, DatabaseConnectionError } = require(
  "../core/errors",
);

const runRegister = async (name) => {
  const normalizedName = typeof name === "string" ? name.trim() : "";
  if (!normalizedName) throw new Error("Activity name is required.");
  const { client, db } = await connectToDatabase();
  try {
    const collection = db.collection("activities");
    const activity = await registerActivity(normalizedName, collection);
    console.log(`Activity "${activity.name}" registered successfully.`);
    return activity;
  } catch (error) {
    if (error instanceof DuplicateActivityError) throw error;
    if (
      error.message.includes("ECONNREFUSED") ||
      error.message.includes("ENOTFOUND")
    ) {
      throw new DatabaseConnectionError();
    }
    throw error;
  } finally {
    await closeConnection(client);
  }
};

module.exports = { runRegister };
