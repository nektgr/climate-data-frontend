import React, { useState, useRef } from "react";
import FileUpload from "./components/FileUpload";
import PlotChart from "./components/PlotChart";
import ThemeToggle from "./components/ThemeToggle";

/**
 * App Component
 * Main application component for climate data visualization.
 * Includes file upload, theme toggle, and chart display functionality.
 */
const App = () => {
  const [chartData, setChartData] = useState(null); // State for chart data
  const [error, setError] = useState(null); // State for error messages
  const [isYearly, setIsYearly] = useState(true); // State to toggle between yearly and monthly views
  const [selectedYear, setSelectedYear] = useState(""); // State for selected year in monthly view
  const fileUploadResetRef = useRef(null); // Ref for resetting file input

  /**
   * Toggles between yearly and monthly chart views.
   */
  const toggleView = () => {
    setIsYearly((prev) => !prev);
  };

  /**
   * Resets the application state to its initial values.
   */
  const resetApp = () => {
    setChartData(null);
    setError(null);
    setIsYearly(true);
    setSelectedYear(""); // Reset selected year
    if (fileUploadResetRef.current) {
      fileUploadResetRef.current.resetFileInput(); // Reset file input
    }
  };

  /**
   * Handles year selection change for monthly view.
   *
   * @param {Event} event - The change event from the year picker.
   */
  const handleYearChange = (event) => setSelectedYear(event.target.value);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white flex flex-col items-center justify-center p-4">
      {/* Theme toggle button */}
      <ThemeToggle />
      <h1 className="text-3xl font-bold mb-6">Climate Data Visualization</h1>

      {/* Error message display */}
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

      {/* File upload component */}
      <FileUpload
        setChartData={setChartData}
        setError={setError}
        resetRef={fileUploadResetRef}
      />

      {/* Chart display */}
      {chartData ? (
        <div className="mt-6 w-full max-w-6xl">
          <div className="mb-4 flex justify-between items-center">
            {/* Toggle view button */}
            <button
              onClick={toggleView}
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
            >
              {isYearly ? "Switch to Monthly View" : "Switch to Yearly View"}
            </button>

            {/* Reset application button */}
            <button
              onClick={resetApp}
              className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition"
            >
              Reset
            </button>
          </div>

          {/* Plot chart */}
          <PlotChart
            data={chartData}
            isYearly={isYearly}
            selectedYear={selectedYear} // Pass selected year to the chart
            onYearChange={handleYearChange} // Pass year change handler
          />
        </div>
      ) : (
        // Placeholder text when no chart data is available
        <p className="text-gray-500 mt-6">Upload a file to see the chart.</p>
      )}
    </div>
  );
};

export default App;
