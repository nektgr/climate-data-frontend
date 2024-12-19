// src/utils/generateChartData.js

import { chartStyles, gridStyles } from "../config/chartConfig";

/**
 * Generates Chart.js compatible data for yearly or monthly views.
 *
 * @param {object} data - The dataset containing years, averages, and monthly data.
 * @param {boolean} isYearly - Flag indicating if the data is for yearly view.
 * @param {string|null} selectedYear - (Optional) The year to filter monthly data.
 * @param {boolean} isDarkMode - Flag indicating if dark mode is active.
 * @returns {object|null} - Chart.js compatible data structure or null if invalid data.
 */
export const generateChartData = (data, isYearly, selectedYear = null, isDarkMode = false) => {
  // Validate input data
  if (!data || !data.years || data.years.length === 0) {
    console.error("Invalid data provided to generateChartData");
    return null;
  }

  const { gridColor, labelColor } = gridStyles(isDarkMode); // Get theme-specific styles

  if (isYearly) {
    // Generate data for yearly view
    return {
      labels: data.years, // Years as x-axis labels
      datasets: [
        {
          label: "Yearly Average",
          data: data.yearly_averages, // Yearly averages data points
          ...chartStyles.yearly, // Apply yearly chart styles
        },
        {
          label: "+1σ", // Upper standard deviation line
          data: data.yearly_averages.map((v, i) => v + data.yearly_stddev[i]),
          ...chartStyles.stdDev, // Apply standard deviation chart styles
        },
        {
          label: "-1σ", // Lower standard deviation line
          data: data.yearly_averages.map((v, i) => v - data.yearly_stddev[i]),
          ...chartStyles.stdDev, // Apply standard deviation chart styles
        },
      ],
    };
  } else {
    // Generate data for monthly view
    const monthlyLabels = [];
    const monthlyValues = [];

    // Extract monthly data for all years
    data.years.forEach((year, yearIndex) => {
      Object.keys(data.monthly_data).forEach((month) => {
        monthlyLabels.push(`${year}-${month}`);
        monthlyValues.push(data.monthly_data[month][yearIndex]);
      });
    });

    // Filter labels and values based on the selected year (if applicable)
    const filteredLabels = selectedYear
      ? monthlyLabels.filter((label) => label.startsWith(selectedYear))
      : monthlyLabels;

    const filteredValues = selectedYear
      ? monthlyValues.filter((_, index) => monthlyLabels[index].startsWith(selectedYear))
      : monthlyValues;

    return {
      labels: filteredLabels, // Filtered monthly labels for x-axis
      datasets: [
        {
          label: "Monthly Temperature",
          data: filteredValues, // Filtered monthly temperature data points
          ...chartStyles.monthly, // Apply monthly chart styles
        },
      ],
    };
  }
};
