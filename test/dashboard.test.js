const test = require("node:test");
const assert = require("node:assert/strict");

const { aggregateProgress } = require("../core/dashboard");

const activities = [
  { _id: "a1", name: "Learn Python" },
  { _id: "a2", name: "Exercise" },
];

test("aggregateProgress returns empty array for no entries", () => {
  assert.deepEqual(aggregateProgress([], activities), []);
});

test("aggregateProgress maps a single entry to a calendar record", () => {
  const entries = [{ activityId: "a1", date: "2026-05-26", duration: 30 }];
  const result = aggregateProgress(entries, activities);

  assert.equal(result.length, 1);
  assert.equal(result[0].activityName, "Learn Python");
  assert.equal(result[0].date, "2026-05-26");
  assert.equal(result[0].duration, 30);
  assert.equal(result[0].day, "Tue");
  assert.ok(result[0].week.startsWith("2026-W"));
});

test("aggregateProgress sums duration for same activity and date", () => {
  const entries = [
    { activityId: "a1", date: "2026-05-26", duration: 30 },
    { activityId: "a1", date: "2026-05-26", duration: 20 },
  ];
  const result = aggregateProgress(entries, activities);

  assert.equal(result.length, 1);
  assert.equal(result[0].duration, 50);
});

test("aggregateProgress keeps entries for different activities separate", () => {
  const entries = [
    { activityId: "a1", date: "2026-05-26", duration: 30 },
    { activityId: "a2", date: "2026-05-26", duration: 45 },
  ];
  const result = aggregateProgress(entries, activities);

  assert.equal(result.length, 2);
  const names = result.map((r) => r.activityName);
  assert.ok(names.includes("Learn Python"));
  assert.ok(names.includes("Exercise"));
});

test("aggregateProgress sorts records by date ascending", () => {
  const entries = [
    { activityId: "a1", date: "2026-05-28", duration: 10 },
    { activityId: "a1", date: "2026-05-26", duration: 20 },
  ];
  const result = aggregateProgress(entries, activities);

  assert.equal(result[0].date, "2026-05-26");
  assert.equal(result[1].date, "2026-05-28");
});
