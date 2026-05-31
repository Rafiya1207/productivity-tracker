const { runHealth } = require("./cli/health");
const { runRegister } = require("./cli/register");
const { runStart } = require("./cli/start");
const { runDashboard } = require("./cli/dashboard");

const showHelp = () => {
  console.log("Available commands:");
  console.log("  node index.js health");
  console.log('  node index.js register "Activity Name"');
  console.log('  node index.js start "Activity Name"');
  console.log("  node index.js dashboard");
};

const commands = (args) => ({
  health: () => runHealth(),
  register: () => runRegister(args.join(" ")),
  start: () => runStart(args.join(" ")),
  dashboard: () => runDashboard(),
});

const main = async () => {
  const [, , command = "help", ...args] = process.argv;
  try {
    await (commands(args)[command] ?? showHelp)();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
};

main();
