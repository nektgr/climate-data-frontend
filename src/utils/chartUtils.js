export const generateChartData = (data, isYearly, selectedYear = null) => {
    if (isYearly) {
      // Generate chart data for yearly view
      return {
        labels: data.years,
        datasets: [
          {
            label: "Yearly Average",
            data: data.yearly_averages,
            borderColor: "blue",
            borderWidth: 3,
            fill: false,
          },
          {
            label: "+1σ",
            data: data.yearly_averages.map((v, i) => v + data.yearly_stddev[i]),
            borderColor: "red",
            borderDash: [5, 5],
            borderWidth: 2,
            fill: false,
          },
          {
            label: "-1σ",
            data: data.yearly_averages.map((v, i) => v - data.yearly_stddev[i]),
            borderColor: "green",
            borderDash: [5, 5],
            borderWidth: 2,
            fill: false,
          },
        ],
      };
    } else {
      // Generate chart data for monthly view
      const monthlyLabels = [];
      const monthlyValues = [];
  
      // Extract monthly data
      data.years.forEach((year, yearIndex) => {
        Object.keys(data.monthly_data).forEach((month) => {
          monthlyLabels.push(`${year}-${month}`);
          monthlyValues.push(data.monthly_data[month][yearIndex]);
        });
      });
  
      // Filter data by the selected year (if applicable)
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
            borderColor: "blue",
            borderWidth: 3,
            pointRadius: 3,
            fill: false,
          },
        ],
      };
    }
  };
  