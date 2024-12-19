// src/config/chartConfig.js
export const chartStyles = {
    yearly: {
      borderWidth: 3,
      borderColor: "blue",
      fill: false,
    },
    stdDev: {
      borderColor: "red",
      borderDash: [5, 5],
      borderWidth: 2,
      fill: false,
    },
    monthly: {
      borderColor: "green",
      pointRadius: 3,
      fill: false,
    },
  };
  
  export const gridStyles = (isDarkMode) => ({
    gridColor: isDarkMode ? "#444" : "#ddd",
    labelColor: isDarkMode ? "white" : "black",
  });
  