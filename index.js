const { runHealth } = require("./cli/health");
const { runRegister } = require("./cli/register");
const { runStart } = require("./cli/start");
const { runDashboard } = require("./cli/dashboard");

async function main() {
  const [, , command = "help", ...args] = process.argv;

  try {
    switch (command) {
      case "health":
        await runHealth();
        break;
      case "register":
        await runRegister(args.join(" "));
        break;
      case "start":
        await runStart(args.join(" "));
        break;
      case "dashboard":
        await runDashboard();
        break;
      default:
        console.log("Available commands:");
        console.log("  node index.js health");
        console.log('  node index.js register "Activity Name"');
        console.log('  node index.js start "Activity Name"');
        console.log("  node index.js dashboard");
        break;
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

main();
