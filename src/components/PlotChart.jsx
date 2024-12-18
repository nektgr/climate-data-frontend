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
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);

  const calculateYearlyData = (data) => {
    if (!data.years || !data.yearly_averages || !data.yearly_stddev) return null;

    return {
      labels: data.years,
      datasets: [
        {
          label: "Yearly Average Temperature",
          data: data.yearly_averages,
          borderColor: "blue",
          borderWidth: 2,
          fill: false,
        },
        {
          label: "+1σ",
          data: data.yearly_averages.map((avg, i) => avg + data.yearly_stddev[i]),
          borderColor: "red",
          borderDash: [5, 5],
          borderWidth: 1,
          fill: false,
        },
        {
          label: "-1σ",
          data: data.yearly_averages.map((avg, i) => avg - data.yearly_stddev[i]),
          borderColor: "green",
          borderDash: [5, 5],
          borderWidth: 1,
          fill: false,
        },
      ],
    };
  };

  const calculateMonthlyData = (data) => {
    if (!data.monthly_data || !data.years) return null;

    const labels = [];
    const values = [];

    Object.entries(data.monthly_data).forEach(([month, temps]) => {
      temps.forEach((temp, i) => {
        labels.push(`${data.years[i]}-${month}`);
        values.push(temp);
      });
    });

    return {
      labels,
      datasets: [
        {
          label: "Monthly Temperature (°C)",
          data: values,
          borderColor: "blue",
          borderWidth: 2,
          pointRadius: 2,
          fill: false,
        },
      ],
    };
  };

  useEffect(() => {
    if (!data) return;

    const updatedData = isYearly ? calculateYearlyData(data) : calculateMonthlyData(data);
    if (!updatedData) {
      console.error("Invalid data structure:", data);
      return;
    }
    setChartData(updatedData);
  }, [data, isYearly]);

  const resetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div>
      <Line
        ref={chartRef}
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  const value = context.raw;
                  return `${context.dataset.label}: ${value.toFixed(2)}°C`;
                },
              },
            },
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
            x: { title: { display: true, text: isYearly ? "Years" : "Year-Month" } },
            y: { title: { display: true, text: "Temperature (°C)" } },
          },
        }}
      />
      <button
        onClick={resetZoom}
        className="px-4 py-2 mt-4 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
      >
        Reset Zoom
      </button>
    </div>
  );
};

export default PlotChart;
