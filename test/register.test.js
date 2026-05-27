const test = require("node:test");
const assert = require("node:assert/strict");

const { registerActivity } = require("../core/activity");

function createCollection(initialRecord = null) {
  const inserted = [];

  return {
    inserted,
    async findOne(query) {
      if (query && query.name) {
        return initialRecord;
      }
      return null;
    },
    async insertOne(doc) {
      inserted.push(doc);
      return { insertedId: "test-id" };
    },
  };
}

test("registerActivity saves a new activity", async () => {
  const collection = createCollection(null);

  const result = await registerActivity("Viz", collection);

  assert.equal(result.name, "Viz");
  assert.equal(collection.inserted.length, 1);
  assert.equal(collection.inserted[0].name, "Viz");
});

test("registerActivity rejects duplicate activity names", async () => {
  const collection = createCollection({ name: "Viz" });

  await assert.rejects(
    () => registerActivity("Viz", collection),
    /already exists/i,
  );

  assert.equal(collection.inserted.length, 0);
});

test("registerActivity rejects empty names", async () => {
  const collection = createCollection(null);

  await assert.rejects(
    () => registerActivity("   ", collection),
    /required/i,
  );

  assert.equal(collection.inserted.length, 0);
});
