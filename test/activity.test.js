const test = require("node:test");
const assert = require("node:assert/strict");

const { findActivity } = require("../core/activity");

const createCollection = (record = null) => ({
  async findOne(query) {
    return record && record.name === query.name ? record : null;
  },
});

test("findActivity returns the activity when found", async () => {
  const collection = createCollection({ name: "Learn Python" });
  const result = await findActivity("Learn Python", collection);
  assert.equal(result.name, "Learn Python");
});

test("findActivity throws when activity is not found", async () => {
  const collection = createCollection(null);
  await assert.rejects(
    () => findActivity("Learn Python", collection),
    /not found/i,
  );
});
