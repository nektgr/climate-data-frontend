import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Title, zoomPlugin);

const PlotChart = ({ data, isYearly }) => {
  const [chartData, setChartData] = useState(null);
  const [xAxisTitle, setXAxisTitle] = useState(isYearly ? "Years" : "Months");
  const [selectedYear, setSelectedYear] = useState(""); // Year picker state for monthly view
  const chartRef = useRef(null);

  useEffect(() => {
    if (data) {
      if (isYearly) {
        // Yearly data
        setChartData({
          labels: data.years,
          datasets: [
            {
              label: "Yearly Average Temperature",
              data: data.yearly_averages,
              borderColor: "blue",
              fill: false,
            },
            {
              label: "+1σ",
              data: data.yearly_averages.map((v, i) => v + data.yearly_stddev[i]),
              borderColor: "red",
              borderDash: [5, 5],
              fill: false,
            },
            {
              label: "-1σ",
              data: data.yearly_averages.map((v, i) => v - data.yearly_stddev[i]),
              borderColor: "green",
              borderDash: [5, 5],
              fill: false,
            },
          ],
        });
        setXAxisTitle("Years");
      } else {
        // Monthly data
        const monthlyLabels = [];
        const monthlyValues = [];

        data.years.forEach((year, yearIndex) => {
          Object.keys(data.monthly_data).forEach((month) => {
            monthlyLabels.push(`${year}-${month}`);
            monthlyValues.push(data.monthly_data[month][yearIndex]);
          });
        });

        // Filter data by selected year (if any)
        const filteredLabels = selectedYear
          ? monthlyLabels.filter((label) => label.startsWith(selectedYear))
          : monthlyLabels;
        const filteredValues = selectedYear
          ? monthlyValues.filter((_, index) => monthlyLabels[index].startsWith(selectedYear))
          : monthlyValues;

        setChartData({
          labels: filteredLabels,
          datasets: [
            {
              label: "Monthly Temperature",
              data: filteredValues,
              borderColor: "blue",
              fill: false,
            },
          ],
        });

        setXAxisTitle(selectedYear ? `Months of ${selectedYear}` : "Months");
      }
    }
  }, [data, isYearly, selectedYear]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const resetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
    // Keep the year picker intact; only reset the zoom
    setXAxisTitle(selectedYear ? `Months of ${selectedYear}` : isYearly ? "Years" : "Months");
  };

  if (!chartData) return null;

  return (
    <div>
      {!isYearly && (
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="year-picker" style={{ marginRight: "10px" }}>
            Select Year:
          </label>
          <select
            id="year-picker"
            value={selectedYear}
            onChange={handleYearChange}
            style={{
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px",
            }}
          >
            <option value="">--All Years--</option>
            {data.years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      )}
      <Line
        ref={chartRef}
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true },
            tooltip: {
              callbacks: {
                label: function (context) {
                  // Customize the tooltip label
                  const value = context.raw;
                  return `${context.dataset.label}: ${value.toFixed(2)}°C`;
                },
              },
            },
            zoom: {
              pan: {
                enabled: true,
                mode: "x",
              },
              zoom: {
                wheel: { enabled: true },
                pinch: { enabled: true },
                mode: "x",
              },
            },
          },
          scales: {
            x: { title: { display: true, text: xAxisTitle } },
            y: { title: { display: true, text: "Temperature (°C)" } },
          },
        }}
      />
      <button
        onClick={resetZoom}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
      >
        Reset Zoom
      </button>
    </div>
  );
};

export default PlotChart;
