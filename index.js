const { runHealth } = require('./cli/health');

async function main() {
  const [, , command = 'help'] = process.argv;

  switch (command) {
    case 'health':
      await runHealth();
      break;
    default:
      console.log('Available commands:');
      console.log('  node index.js health');
      break;
  }
}

main().catch((error) => {
  console.error('Command failed:', error.message);
  process.exitCode = 1;
});
