const { connectToDatabase, closeConnection } = require("../database/connection");
const { findActivity } = require("../core/activity");
const { formatDuration } = require("../core/duration");

const printElapsed = (name, startTime) => {
  const elapsed = Math.floor((Date.now() - startTime) / 60000);
  process.stdout.write(`\rTracking "${name}" — ${formatDuration(elapsed)}  (Ctrl+C to stop)`);
};

const attachSigint = (interval, client) => {
  process.on("SIGINT", async () => {
    clearInterval(interval);
    process.stdout.write("\n");
    await closeConnection(client);
    process.exit(0);
  });
};

const startLiveTimer = (name, client) => {
  const startTime = Date.now();
  printElapsed(name, startTime);
  const interval = setInterval(() => printElapsed(name, startTime), 1000);
  attachSigint(interval, client);
};

const runStart = async (name) => {
  const normalizedName = typeof name === "string" ? name.trim() : "";
  if (!normalizedName) throw new Error("Activity name is required.");
  const { client, db } = await connectToDatabase();
  const collection = db.collection("activities");
  const activity = await findActivity(normalizedName, collection);
  startLiveTimer(activity.name, client);
};

module.exports = { runStart };
