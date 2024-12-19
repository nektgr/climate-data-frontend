/**
 * Generates chart data for yearly or monthly views.
 *
 * @param {object} data - The dataset containing years, averages, and monthly data.
 * @param {boolean} isYearly - Flag indicating if the data is for yearly view.
 * @param {string|null} selectedYear - The year to filter monthly data (optional).
 * @returns {object} - Chart.js compatible data structure.
 */
export const generateChartData = (data, isYearly, selectedYear = null) => {
  if (isYearly) {
    // Generate chart data for the yearly view
    return {
      labels: data.years,
      datasets: [
        {
          label: "Yearly Average",
          data: data.yearly_averages,
          borderColor: "blue", // Line color for yearly averages
          borderWidth: 3, // Line thickness
          fill: false, // No area fill under the line
        },
        {
          label: "+1σ",
          data: data.yearly_averages.map((v, i) => v + data.yearly_stddev[i]),
          borderColor: "red", // Line color for +1σ
          borderDash: [5, 5], // Dashed line style
          borderWidth: 2, // Line thickness
          fill: false, // No area fill under the line
        },
        {
          label: "-1σ",
          data: data.yearly_averages.map((v, i) => v - data.yearly_stddev[i]),
          borderColor: "green", // Line color for -1σ
          borderDash: [5, 5], // Dashed line style
          borderWidth: 2, // Line thickness
          fill: false, // No area fill under the line
        },
      ],
    };
  } else {
    // Generate chart data for the monthly view
    const monthlyLabels = [];
    const monthlyValues = [];

    // Extract monthly data
    data.years.forEach((year, yearIndex) => {
      Object.keys(data.monthly_data).forEach((month) => {
        monthlyLabels.push(`${year}-${month}`);
        monthlyValues.push(data.monthly_data[month][yearIndex]);
      });
    });

    // Filter labels and values by the selected year (if applicable)
    const filteredLabels = selectedYear
      ? monthlyLabels.filter((label) => label.startsWith(selectedYear))
      : monthlyLabels;

    const filteredValues = selectedYear
      ? monthlyValues.filter((_, index) => monthlyLabels[index].startsWith(selectedYear))
      : monthlyValues;

    return {
      labels: filteredLabels,
      datasets: [
        {
          label: "Monthly Temperature",
          data: filteredValues,
          borderColor: "blue", // Line color for monthly temperatures
          borderWidth: 3, // Line thickness
          pointRadius: 3, // Data point size
          fill: false, // No area fill under the line
        },
      ],
    };
  }
};
