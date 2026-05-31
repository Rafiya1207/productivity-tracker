const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const isoWeek = (dateStr) => {
  const d = new Date(dateStr);
  const jan4 = new Date(d.getFullYear(), 0, 4);
  const week = Math.ceil(((d - jan4) / 86400000 + jan4.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${String(week).padStart(2, "0")}`;
};

const buildNameMap = (activities) =>
  Object.fromEntries(activities.map((a) => [String(a._id), a.name]));

const groupByDay = (entries) =>
  entries.reduce((acc, e) => {
    const key = `${e.activityId}|${e.date}`;
    if (!acc[key]) acc[key] = { activityId: e.activityId, date: e.date, duration: 0 };
    acc[key].duration += e.duration;
    return acc;
  }, {});

const toCalendarRecord = (nameMap) => (g) => ({
  activityName: nameMap[String(g.activityId)] || String(g.activityId),
  date: g.date,
  duration: g.duration,
  day: DAY_NAMES[new Date(g.date).getDay()],
  week: isoWeek(g.date),
});

const aggregateProgress = (entries, activities) => {
  if (!entries.length) return [];
  const nameMap = buildNameMap(activities);
  const grouped = Object.values(groupByDay(entries));
  return grouped.map(toCalendarRecord(nameMap)).sort((a, b) => a.date.localeCompare(b.date));
};

module.exports = { aggregateProgress };
