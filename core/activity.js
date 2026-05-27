async function registerActivity(name, collection) {
  const normalizedName = typeof name === "string" ? name.trim() : "";

  if (!normalizedName) {
    throw new Error("Activity name is required.");
  }

  const existingActivity = await collection.findOne({ name: normalizedName });

  if (existingActivity) {
    throw new Error(`Activity "${normalizedName}" already exists.`);
  }

  const createdAt = new Date().toISOString();
  const activity = { name: normalizedName, createdAt };

  await collection.insertOne(activity);

  return activity;
}

module.exports = {
  registerActivity,
};
