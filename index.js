const { runHealth } = require("./cli/health");
const { runRegister } = require("./cli/register");

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
      default:
        console.log("Available commands:");
        console.log("  node index.js health");
        console.log('  node index.js register "Activity Name"');
        break;
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

main();
