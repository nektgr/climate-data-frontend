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
    labels: data.labels, // Dynamic labels
    datasets: [
      {
        label: "Yearly Average Temperature",
        data: data.values, // Dynamic data
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
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
      zoom: {
        pan: { enabled: true, mode: "x" },
        zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: "x" },
      },
    },
    scales: {
      x: { title: { display: true, text: "Years" } },
      y: { title: { display: true, text: "Temperature (°C)" } },
    },
  };

  const resetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  return (
    <div>
      <Line ref={chartRef} data={chartData} options={options} />
      <button onClick={resetZoom} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Reset Zoom
      </button>
    </div>
  );
};
export default PlotChart;
