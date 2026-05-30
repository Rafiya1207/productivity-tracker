const test = require("node:test");
const assert = require("node:assert/strict");

const { formatDuration } = require("./duration");

test("formatDuration returns 0m for zero minutes", () => {
  assert.equal(formatDuration(0), "0m");
});

test("formatDuration returns Xm for under 60 minutes", () => {
  assert.equal(formatDuration(45), "45m");
});

test("formatDuration returns Xh 0m for exact hours", () => {
  assert.equal(formatDuration(60), "1h 0m");
});

test("formatDuration returns Xh Ym for mixed hours and minutes", () => {
  assert.equal(formatDuration(90), "1h 30m");
});

test("formatDuration clamps negative input to 0m", () => {
  assert.equal(formatDuration(-10), "0m");
});
