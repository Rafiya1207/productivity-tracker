const saveProgress = async (activityId, date, duration, collection) => {
  const entry = { activityId, date, duration: Math.floor(duration) };
  await collection.insertOne(entry);
  return entry;
};

module.exports = { saveProgress };
