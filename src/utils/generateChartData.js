// src/utils/generateChartData.js
import { chartStyles, gridStyles } from "../config/chartConfig";

export const generateChartData = (data, isYearly, selectedYear = null, isDarkMode = false) => {
  if (!data || !data.years || data.years.length === 0) {
    console.error("Invalid data provided to generateChartData");
    return null;
  }

  const { gridColor, labelColor } = gridStyles(isDarkMode);

  if (isYearly) {
    return {
      labels: data.years,
      datasets: [
        {
          label: "Yearly Average",
          data: data.yearly_averages,
          ...chartStyles.yearly,
        },
        {
          label: "+1σ",
          data: data.yearly_averages.map((v, i) => v + data.yearly_stddev[i]),
          ...chartStyles.stdDev,
        },
        {
          label: "-1σ",
          data: data.yearly_averages.map((v, i) => v - data.yearly_stddev[i]),
          ...chartStyles.stdDev,
        },
      ],
    };
  } else {
    const monthlyLabels = [];
    const monthlyValues = [];
    data.years.forEach((year, yearIndex) => {
      Object.keys(data.monthly_data).forEach((month) => {
        monthlyLabels.push(`${year}-${month}`);
        monthlyValues.push(data.monthly_data[month][yearIndex]);
      });
    });

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
          ...chartStyles.monthly,
        },
      ],
    };
  }
};
