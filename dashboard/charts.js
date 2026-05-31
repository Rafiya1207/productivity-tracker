const renderCharts = (data, spec) => {
  const activities = [...new Set(data.map((r) => r.activityName))];
  const container = document.getElementById("charts");

  activities.forEach((name) => {
    const wrapper = document.createElement("div");
    const heading = document.createElement("h2");
    heading.textContent = name;
    const chartDiv = document.createElement("div");
    chartDiv.setAttribute("data-activity", name);
    wrapper.appendChild(heading);
    wrapper.appendChild(chartDiv);
    container.appendChild(wrapper);

    const values = data.filter((r) => r.activityName === name);
    vegaEmbed(chartDiv, { ...spec, data: { values } }).catch(console.error);
  });
};

fetch("spec.json")
  .then((res) => res.json())
  .then((spec) => renderCharts(window.chartData, spec));
