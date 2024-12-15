import React, { useEffect, useRef, useState } from "react";
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
  const chartRef = useRef(null);

  const calculateYearlyData = (data) => {
    const yearlyData = {};
    data.labels.forEach((date, index) => {
      const year = date.split("-")[0];
      if (!yearlyData[year]) yearlyData[year] = [];
      yearlyData[year].push(data.values[index]);
    });

    const years = Object.keys(yearlyData);
    const averages = years.map((year) => {
      const values = yearlyData[year];
      return values.reduce((sum, value) => sum + value, 0) / values.length;
    });

    const stddevs = years.map((year, idx) => {
      const values = yearlyData[year];
      const mean = averages[idx];
      return Math.sqrt(values.map((v) => (v - mean) ** 2).reduce((sum, v) => sum + v, 0) / values.length);
    });

    return { labels: years, values: averages, stddev: stddevs };
  };

  useEffect(() => {
    if (isYearly) {
      const yearlyData = calculateYearlyData(data);
      setChartData({
        labels: yearlyData.labels,
        datasets: [
          {
            label: "Yearly Average Temperature",
            data: yearlyData.values,
            borderColor: "blue",
            fill: false,
          },
          {
            label: "+1σ",
            data: yearlyData.values.map((v, i) => v + yearlyData.stddev[i]),
            borderColor: "red",
            borderDash: [5, 5],
            fill: false,
          },
          {
            label: "-1σ",
            data: yearlyData.values.map((v, i) => v - yearlyData.stddev[i]),
            borderColor: "green",
            borderDash: [5, 5],
            fill: false,
          },
        ],
      });
    } else {
      setChartData({
        labels: data.labels,
        datasets: [
          {
            label: "Monthly Temperature",
            data: data.values,
            borderColor: "blue",
            fill: false,
          },
        ],
      });
    }
  }, [isYearly, data]);

  const resetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  if (!chartData) return null;

  return (
    <div>
      <Line
        ref={chartRef}
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true },
            zoom: {
              pan: {
                enabled: true,
                mode: "x", // Enable panning along the x-axis
              },
              zoom: {
                wheel: { enabled: true }, // Enable zooming with the mouse wheel
                pinch: { enabled: true }, // Enable zooming with pinch gestures
                mode: "x", // Enable zooming along the x-axis
              },
            },
          },
          scales: {
            x: { title: { display: true, text: isYearly ? "Years" : "Months" } },
            y: { title: { display: true, text: "Temperature (°C)" } },
          },
        }}
      />
      <button
        onClick={resetZoom}
        style={{
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Reset Zoom
      </button>
    </div>
  );
};

export default PlotChart;
