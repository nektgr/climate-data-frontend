import React, { useRef } from "react";
import Papa from "papaparse";

const FileUpload = ({ setChartData, setError }) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file || file.type !== "text/csv") {
      setError("Invalid file type. Please upload a valid CSV file.");
      return;
    }

    setChartData(null); // Clear existing chart data
    setError(null); // Clear existing errors

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log("Parsed Results:", results);

        const normalizeHeader = (header) => header.trim().toLowerCase();
        const headers = results.meta.fields.map(normalizeHeader);
        const requiredHeaders = ["year", "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

        // Check for missing headers
        const missingHeaders = requiredHeaders.filter((header) => !headers.includes(header));
        if (missingHeaders.length > 0) {
          setError(`Missing required columns: ${missingHeaders.join(", ")}.`);
          return;
        }

        const labels = [];
        const values = [];
        let skippedRows = 0;

        // Process each row of data
        results.data.forEach((row) => {
          const year = row["Year"]?.trim() || row["year"]?.trim();
          if (!year || isNaN(year)) {
            skippedRows++;
            return; // Skip rows with invalid year
          }

          requiredHeaders.slice(1).forEach((month, index) => {
            const value = parseFloat(row[month]?.trim() || row[month.charAt(0).toUpperCase() + month.slice(1)]?.trim());
            if (!isNaN(value)) {
              labels.push(`${year}-${String(index + 1).padStart(2, "0")}`);
              values.push(value);
            }
          });
        });

        if (!labels.length || !values.length) {
          setError("No valid data found in the CSV file. Ensure all months have numeric values and 'Year' is properly formatted.");
          return;
        }

        if (skippedRows > 0) {
          setError(`${skippedRows} rows were skipped due to invalid data.`);
        } else {
          setError(null); // Clear any previous errors
        }

        setChartData({ labels, values });
      },
      error: (err) => {
        console.error("Error reading file:", err);
        setError("Error reading the file. Please try again.");
      },
    });
  };

  const handleReset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input value
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        style={{ marginBottom: "10px" }}
      />
      <button
        onClick={handleReset}
        className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition"
      >
        Reset File Input
      </button>
    </div>
  );
};

export default FileUpload;
