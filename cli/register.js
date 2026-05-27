const { connectToDatabase, closeConnection } = require(
  "../database/connection",
);
const { registerActivity } = require("../core/activity");

async function runRegister(name) {
  const normalizedName = typeof name === "string" ? name.trim() : "";

  if (!normalizedName) {
    throw new Error("Activity name is required.");
  }

  const { client, db } = await connectToDatabase();

  try {
    const collection = db.collection("activities");
    const activity = await registerActivity(normalizedName, collection);

    console.log(`Activity "${activity.name}" registered successfully.`);
    return activity;
  } catch (error) {
    if (error.message.includes("already exists")) {
      throw new Error(`Activity "${normalizedName}" already exists.`);
    }

    if (
      error.message.includes("ECONNREFUSED") ||
      error.message.includes("ENOTFOUND")
    ) {
      throw new Error(
        "Unable to connect to MongoDB. Check your MONGODB_URI setting.",
      );
    }

    throw error;
  } finally {
    await closeConnection(client);
  }
}

module.exports = {
  runRegister,
};
