const dotenv = require('dotenv');

function loadConfig() {
  dotenv.config();

  return {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/productivity-tracker',
  };
}

module.exports = {
  loadConfig,
};
