const { connectToDatabase, closeConnection } = require(
  "../database/connection",
);
const { aggregateProgress } = require("../core/dashboard");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const fetchAll = (db, name) => db.collection(name).find().toArray();

const openBrowser = (filePath) => {
  switch (process.platform) {
    case "darwin": return exec(`open "${filePath}"`);
    case "win32": return exec(`start "${filePath}"`);
    default: return exec(`xdg-open "${filePath}"`);
  }
};
  
const writeDataFile = (records) => {
  const spec = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../dashboard/spec.json"), "utf8"),
  );
  const dataPath = path.join(__dirname, "../dashboard/data.js");
  fs.writeFileSync(
    dataPath,
    `window.chartData = ${JSON.stringify(records)};\nwindow.chartSpec = ${
      JSON.stringify(spec)
    };`,
  );
  return path.join(__dirname, "../dashboard/index.html");
};

const runDashboard = async () => {
  const { client, db } = await connectToDatabase();
  try {
    const activities = await fetchAll(db, "activities");
    const entries = await fetchAll(db, "progress");
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
