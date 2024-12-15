import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import PlotChart from "./components/PlotChart";

const App = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [isYearly, setIsYearly] = useState(true);

  const toggleView = () => {
    setIsYearly((prev) => !prev);
  };

  const resetApp = () => {
    setChartData(null);
    setError(null);
    setIsYearly(true); // Reset to default view
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Climate Data Visualization</h1>
      {error && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "10px",
            border: "1px solid #f5c6cb",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}
      <FileUpload setChartData={setChartData} setError={setError} />
      {chartData ? (
        <div className="mt-6 w-full max-w-6xl">
          <div className="mb-4 flex justify-between items-center">
            <button
              onClick={toggleView}
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
            >
              {isYearly ? "Switch to Monthly View" : "Switch to Yearly View"}
            </button>
            <button
              onClick={resetApp}
              className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition"
            >
              Reset
            </button>
          </div>
          <PlotChart data={chartData} isYearly={isYearly} />
        </div>
      ) : (
        <p className="text-gray-500 mt-6">Upload a file to see the chart.</p>
      )}
    </div>
  );
};

export default App;
