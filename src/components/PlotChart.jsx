import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const PlotChart = ({ data }) => {
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

  return (
    <div>
      <h2>Temperature Data Visualization</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PlotChart;
