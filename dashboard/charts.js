const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const padDays = (data) => {
  const weeks = [...new Set(data.map((r) => r.week))];
  const activityName = data[0].activityName;
  const existing = new Set(data.map((r) => `${r.week}|${r.day}`));
  const padding = weeks.flatMap((week) =>
    DAYS.filter((day) => !existing.has(`${week}|${day}`))
        .map((day) => ({ activityName, week, day, duration: 0 }))
  );
  return [...data, ...padding];
};

const renderCharts = (data, spec) => {
  const activities = [...new Set(data.map((r) => r.activityName))];
  const container = document.getElementById("charts");

  activities.forEach((name) => {
    const wrapper = document.createElement("div");
    const heading = document.createElement("h2");
    heading.textContent = name;
    const chartDiv = document.createElement("div");
    wrapper.appendChild(heading);
    wrapper.appendChild(chartDiv);
    container.appendChild(wrapper);

    const values = padDays(data.filter((r) => r.activityName === name));
    vegaEmbed(chartDiv, { ...spec, data: { values } }).catch(console.error);
  });
};

renderCharts(window.chartData, window.chartSpec);
