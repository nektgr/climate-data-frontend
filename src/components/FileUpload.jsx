import React, { useState } from "react";
import axios from "axios";
import PlotChart from "./PlotChart";

const App = () => {
  const [chartData, setChartData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileUpload = async (event) => {
    setErrorMessage(""); // Clear previous errors
    const file = event.target.files[0];

    if (!file) {
      setErrorMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Upload file to backend
      const uploadResponse = await axios.post(
        "http://127.0.0.1:8000/api/upload/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Extract only the file name from the response
      const fileName = uploadResponse.data.file_path.split("/").pop();

      // Process file
      const processResponse = await axios.get(
        `http://127.0.0.1:8000/api/process/?file_name=${fileName}`
      );

      // Set chart data
      const { years, yearly_averages } = processResponse.data;
      setChartData({
        labels: years,
        values: yearly_averages,
      });
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Climate Data Visualization</h1>

      {/* File Upload Section */}
      <div className="mb-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="block mb-2"
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>

      {/* Chart Section */}
      {chartData ? (
        <PlotChart data={chartData} />
      ) : (
        <p className="text-gray-500">Upload a file to visualize data.</p>
      )}
    </div>
  );
};

export default App;
