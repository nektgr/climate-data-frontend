import React, { useEffect, useState } from "react";
import axios from "axios";
import PlotChart from "./components/PlotChart";

const App = () => {
  const [chartData, setChartData] = useState({ labels: [], values: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/api/process/?file_name=IDCJAC0002_066062_Data12.csv");
        const data = response.data;

        // Process data for Chart.js
        const labels = data.years; // X-axis labels (e.g., years)
        const values = data.yearly_averages; // Y-axis data (e.g., averages)

        setChartData({ labels, values });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Climate Data Analysis</h1>
      <PlotChart data={chartData} />
    </div>
  );
};

export default App;