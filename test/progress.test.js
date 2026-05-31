const test = require("node:test");
const assert = require("node:assert/strict");

const { saveProgress } = require("../core/progress");

const createCollection = () => {
  const inserted = [];
  return {
    inserted,
    async insertOne(doc) {
      inserted.push(doc);
      return { insertedId: "test-id" };
    },
  };
};

test("saveProgress inserts a document with correct fields", async () => {
  const collection = createCollection();
  const activityId = "abc123";

  await saveProgress(activityId, "2026-05-30", 45, collection);

  assert.equal(collection.inserted.length, 1);
  assert.equal(collection.inserted[0].activityId, "abc123");
  assert.equal(collection.inserted[0].date, "2026-05-30");
  assert.equal(collection.inserted[0].duration, 45);
});

test("saveProgress returns the inserted entry", async () => {
  const collection = createCollection();

  const result = await saveProgress("abc123", "2026-05-30", 90, collection);

  assert.equal(result.activityId, "abc123");
  assert.equal(result.date, "2026-05-30");
  assert.equal(result.duration, 90);
});

test("saveProgress floors fractional minutes to integer", async () => {
  const collection = createCollection();

  const result = await saveProgress("abc123", "2026-05-30", 1.8, collection);

  assert.equal(result.duration, 1);
});
