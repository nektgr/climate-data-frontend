import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import PlotChart from "./components/PlotChart";

const App = () => {
  const [chartData, setChartData] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Climate Data Visualization</h1>
      <FileUpload setChartData={setChartData} />
      {chartData ? (
        <div className="mt-6 w-full max-w-4xl">
          <PlotChart data={chartData} />
        </div>
      ) : (
        <p className="text-gray-500 mt-6">Upload a file to see the chart.</p>
      )}
    </div>
  );
};

export default App;
