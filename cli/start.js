const { connectToDatabase, closeConnection } = require(
  "../database/connection",
);
const { findActivity } = require("../core/activity");
const { formatDuration } = require("../core/duration");
const { saveProgress } = require("../core/progress");

const calcElapsed = (startTime) => Math.floor((Date.now() - startTime) / 60000);

const teardown = (interval) => {
  clearInterval(interval);
  process.stdin.setRawMode(false);
  process.stdin.pause();
};

const printElapsed = (name, startTime) => {
  process.stdout.write(
    `\rTracking "${name}" — ${
      formatDuration(calcElapsed(startTime))
    }  (Press S to stop)`,
  );
};

const stopSession = async (activity, startTime, interval, client, db) => {
  teardown(interval);
  const minutes = Math.max(1, calcElapsed(startTime));
  const date = new Date().toISOString().slice(0, 10);
  await saveProgress(activity._id, date, minutes, db.collection("progress"));
  process.stdout.write(
    `\nSaved ${formatDuration(minutes)} for "${activity.name}"\n`,
  );
  await closeConnection(client);
  process.exit(0);
};

const cancelSession = async (interval, client) => {
  teardown(interval);
  process.stdout.write("\nTracking cancelled.\n");
  await closeConnection(client);
  process.exit(0);
};

const attachStopKey = (activity, startTime, interval, client, db) => {
  const handlers = {
    s: () => stopSession(activity, startTime, interval, client, db),
    "\x03": () => cancelSession(interval, client),
  };
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  let stopped = false;
  process.stdin.on("data", async (key) => {
    const handler = handlers[key.toLowerCase()];
    if (stopped || !handler) return;
    stopped = true;
    await handler();
  });
};

const startLiveTimer = (activity, client, db) => {
  const startTime = Date.now();
  printElapsed(activity.name, startTime);
  const interval = setInterval(
    () => printElapsed(activity.name, startTime),
    1000,
  );
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
