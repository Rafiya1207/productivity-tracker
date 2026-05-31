const { DuplicateActivityError, ActivityNotFoundError } = require("./errors");

const registerActivity = async (name, collection) => {
  const normalizedName = typeof name === "string" ? name.trim() : "";
  if (!normalizedName) throw new Error("Activity name is required.");
  const existingActivity = await collection.findOne({ name: normalizedName });
  if (existingActivity) throw new DuplicateActivityError(normalizedName);
  const activity = {
    name: normalizedName,
    createdAt: new Date().toISOString(),
  };
  await collection.insertOne(activity);
  return activity;
};

const findActivity = async (name, collection) => {
  const activity = await collection.findOne({ name });
  if (!activity) throw new ActivityNotFoundError(name);
  return activity;
};

module.exports = { registerActivity, findActivity };
