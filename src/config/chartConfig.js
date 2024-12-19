// src/config/chartConfig.js

/**
 * Chart styles configuration
 * Defines reusable styles for different types of datasets.
 */
export const chartStyles = {
  yearly: {
    borderWidth: 3,
    borderColor: "blue", // Blue line for yearly averages
    fill: false, // No fill under the line
  },
  stdDev: {
    borderColor: "red", // Red dashed line for standard deviation (+1σ/-1σ)
    borderDash: [5, 5], // Dashed line style
    borderWidth: 2,
    fill: false, // No fill under the line
  },
  monthly: {
    borderColor: "green", // Green line for monthly data
    pointRadius: 3, // Smaller point markers
    fill: false, // No fill under the line
  },
};

/**
 * Grid styles generator
 * Returns grid and label styles based on the current theme (dark or light mode).
 *
 * @param {boolean} isDarkMode - Indicates if dark mode is active.
 * @returns {object} - Grid and label style configuration.
 */
export const gridStyles = (isDarkMode) => ({
  gridColor: isDarkMode ? "#444" : "#ddd", // Grid line color
  labelColor: isDarkMode ? "white" : "black", // Axis label color
});
