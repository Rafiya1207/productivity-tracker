const { connectToDatabase, closeConnection } = require("../database/connection");
const { aggregateProgress } = require("../core/dashboard");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const openBrowser = (filePath) => {
  const cmd = process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";
  exec(`${cmd} "${filePath}"`, (err) => {
    if (err) console.log(`Open manually: file://${filePath}`);
  });
};

const writeDataFile = (records) => {
  const spec = JSON.parse(fs.readFileSync(path.join(__dirname, "../dashboard/spec.json"), "utf8"));
  const dataPath = path.join(__dirname, "../dashboard/data.js");
  fs.writeFileSync(dataPath, `window.chartData = ${JSON.stringify(records)};\nwindow.chartSpec = ${JSON.stringify(spec)};`);
  return path.join(__dirname, "../dashboard/index.html");
};

const runDashboard = async () => {
  const { client, db } = await connectToDatabase();
  try {
    const activities = await db.collection("activities").find().toArray();
    const entries = await db.collection("progress").find().toArray();
    const records = aggregateProgress(entries, activities);
    if (!records.length) {
      console.log("No data to display.");
      return;
    }
    const htmlPath = writeDataFile(records);
    openBrowser(htmlPath);
    console.log("Dashboard opened.");
  } finally {
    await closeConnection(client);
  }
};

module.exports = { runDashboard };
