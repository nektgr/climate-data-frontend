import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

// Register the necessary components and plugins
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, zoomPlugin);

const PlotChart = ({ data }) => {
  const chartRef = useRef(null);

  const chartData = {
    labels: data.labels, // Array of months or years
    datasets: [
      {
        label: "Average Temperature",
        data: data.values, // Array of temperatures
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.4, // Curved lines
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x", // Pan along x-axis
        },
        zoom: {
          wheel: {
            enabled: true, // Enable zooming with the mouse wheel
          },
          pinch: {
            enabled: true, // Enable zooming on touch devices
          },
          mode: "x", // Zoom along x-axis
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Temperature (°C)",
        },
        min: 0, // Set based on your data range
      },
    },
  };

  const resetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  return (
    <div>
      <h2>Temperature Data Visualization</h2>
      <Line ref={chartRef} data={chartData} options={options} />
      <div style={{ marginTop: "10px" }}>
        <button onClick={resetZoom} style={{ padding: "5px 10px", cursor: "pointer" }}>
          Reset Zoom
        </button>
      </div>
    </div>
  );
};

export default PlotChart;
