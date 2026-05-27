const { MongoClient } = require('mongodb');
const { loadConfig } = require('../config/env');

async function connectToDatabase() {
  const { MONGODB_URI } = loadConfig();
  const client = new MongoClient(MONGODB_URI);

  await client.connect();

  return {
    client,
    db: client.db(),
  };
}

async function closeConnection(client) {
  if (client) {
    await client.close();
  }
}

module.exports = {
  connectToDatabase,
  closeConnection,
};
