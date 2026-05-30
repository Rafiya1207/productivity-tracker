const { connectToDatabase, closeConnection } = require("../database/connection");
const { findActivity } = require("../core/activity");
const { formatDuration } = require("../core/duration");
const { saveProgress } = require("../core/progress");

const printElapsed = (name, startTime) => {
  const elapsed = Math.floor((Date.now() - startTime) / 60000);
  process.stdout.write(`\rTracking "${name}" — ${formatDuration(elapsed)}  (Press S to stop)`);
};

const stopSession = async (activity, startTime, interval, client, db) => {
  clearInterval(interval);
  process.stdin.setRawMode(false);
  process.stdin.pause();
  const minutes = Math.max(1, Math.floor((Date.now() - startTime) / 60000));
  const date = new Date().toISOString().slice(0, 10);
  await saveProgress(activity._id, date, minutes, db.collection("progress"));
  process.stdout.write(`\nSaved ${formatDuration(minutes)} for "${activity.name}"\n`);
  await closeConnection(client);
  process.exit(0);
};

const cancelSession = async (interval, client) => {
  clearInterval(interval);
  process.stdin.setRawMode(false);
  process.stdin.pause();
  process.stdout.write("\nTracking cancelled.\n");
  await closeConnection(client);
  process.exit(0);
};

const attachStopKey = (activity, startTime, interval, client, db) => {
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  let stopped = false;
  process.stdin.on("data", async (key) => {
    if (stopped) return;
    if (key === "s" || key === "S") {
      stopped = true;
      await stopSession(activity, startTime, interval, client, db);
    } else if (key === "\x03") {
      stopped = true;
      await cancelSession(interval, client);
    }
  });
};

const startLiveTimer = (activity, client, db) => {
  const startTime = Date.now();
  printElapsed(activity.name, startTime);
  const interval = setInterval(() => printElapsed(activity.name, startTime), 1000);
  attachStopKey(activity, startTime, interval, client, db);
};

const runStart = async (name) => {
  const normalizedName = typeof name === "string" ? name.trim() : "";
  if (!normalizedName) throw new Error("Activity name is required.");
  const { client, db } = await connectToDatabase();
  const collection = db.collection("activities");
  try {
    const activity = await findActivity(normalizedName, collection);
    startLiveTimer(activity, client, db);
  } catch (error) {
    await closeConnection(client);
    throw error;
  }
};

module.exports = { runStart };
