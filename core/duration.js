const formatDuration = (minutes) => {
  const m = Math.max(0, Math.floor(minutes));
  if (m < 60) return `${m}m`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
};

module.exports = { formatDuration };
