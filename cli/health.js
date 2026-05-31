const { connectToDatabase, closeConnection } = require(
  "../database/connection",
);

const runHealth = async () => {
  console.log("Starting health check...");
  const { client, db } = await connectToDatabase();
  try {
    await db.command({ ping: 1 });
    console.log("Health check passed. MongoDB connection successful.");
  } finally {
    await closeConnection(client);
  }
};

module.exports = { runHealth };
