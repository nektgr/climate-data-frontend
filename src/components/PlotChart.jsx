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
import { useTheme } from "../ThemeContext";
import PropTypes from "prop-types";

// Register Chart.js components and plugins
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Title, zoomPlugin);

/**
 * PlotChart component
 * Renders a line chart with yearly or monthly data, supporting zoom and pan functionalities.
 *
 * Props:
 * - data: Chart data including labels and values.
 * - isYearly: Boolean indicating if the chart is for yearly or monthly data.
 * - selectedYear: Currently selected year for filtering monthly data.
 * - onYearChange: Function to handle year selection changes.
 */
const PlotChart = ({ data, isYearly, selectedYear, onYearChange }) => {
  const { isDarkMode } = useTheme(); // Theme context for dark/light mode
  const [chartData, setChartData] = useState(null); // State for chart data
  const [xAxisTitle, setXAxisTitle] = useState(isYearly ? "Years" : "Months"); // X-axis title
  const chartRef = useRef(null); // Reference to the chart instance

  /**
   * Updates the chart data and labels based on the selected view (yearly/monthly).
   */
  useEffect(() => {
    if (data) {
      if (isYearly) {
        // Prepare data for yearly view
        setChartData({
          labels: data.years,
          datasets: [
            {
              label: "Yearly Average Temperature",
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
        });
        setXAxisTitle("Years");
      } else {
        // Prepare data for monthly view
        const monthlyLabels = [];
        const monthlyValues = [];
        data.years.forEach((year, yearIndex) => {
          Object.keys(data.monthly_data).forEach((month) => {
            monthlyLabels.push(`${year}-${month}`);
            monthlyValues.push(data.monthly_data[month][yearIndex]);
          });
        });

        // Filter labels and values if a year is selected
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
              borderWidth: 3,
              pointRadius: 3,
              fill: false,
            },
          ],
        });
        setXAxisTitle(selectedYear ? `Months of ${selectedYear}` : "Months");
      }
    }
  }, [data, isYearly, selectedYear]);

  /**
   * Resets the chart zoom and updates the X-axis title.
   */
  const resetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
    setXAxisTitle(selectedYear ? `Months of ${selectedYear}` : isYearly ? "Years" : "Months");
  };

  // Return null if no chart data is available
  if (!chartData) return null;

  return (
    <div>
      {!isYearly && (
        <div style={{ marginBottom: "20px" }}>
          {/* Dropdown for year selection */}
          <label
            htmlFor="year-picker"
            style={{ marginRight: "10px", color: isDarkMode ? "white" : "black" }}
          >
            Select Year:
          </label>
          <select
            id="year-picker"
            value={selectedYear}
            onChange={onYearChange}
            className={`p-2 border rounded ${
              isDarkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-300"
            }`}
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
      {/* Line chart */}
      <Line
        ref={chartRef}
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
              labels: {
                color: isDarkMode ? "white" : "black",
              },
            },
            tooltip: {
              callbacks: {
                label: (context) => `${context.dataset.label}: ${context.raw.toFixed(2)}°C`,
              },
            },
            zoom: {
              pan: { enabled: true, mode: "x" },
              zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: "x" },
            },
          },
          scales: {
            x: {
              title: { display: true, text: xAxisTitle, color: isDarkMode ? "white" : "black" },
              ticks: { color: isDarkMode ? "white" : "black" },
              grid: { color: isDarkMode ? "#444" : "#ddd" },
            },
            y: {
              title: { display: true, text: "Temperature (°C)", color: isDarkMode ? "white" : "black" },
              ticks: { color: isDarkMode ? "white" : "black" },
              grid: { color: isDarkMode ? "#444" : "#ddd" },
            },
          },
        }}
      />
      {/* Reset zoom button */}
      <button
        onClick={resetZoom}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
      >
        Reset Zoom
      </button>
    </div>
  );
};

// Define expected prop types for the component
PlotChart.propTypes = {
  data: PropTypes.object.isRequired,
  isYearly: PropTypes.bool.isRequired,
  selectedYear: PropTypes.string,
  onYearChange: PropTypes.func,
};

export default PlotChart;
