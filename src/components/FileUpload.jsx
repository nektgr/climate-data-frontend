import React, { useRef } from "react";
import PropTypes from "prop-types";

/**
 * FileUpload component
 * Handles file input for uploading and processing CSV files.
 *
 * Props:
 * - setChartData: Function to update the chart data.
 * - setError: Function to handle error messages.
 * - resetRef: React ref to reset the file input field.
 */
const FileUpload = ({ setChartData, setError, resetRef }) => {
  const fileInputRef = useRef(null); // Reference to the file input element

  /**
   * Handles the file upload and processing.
   * Validates the file type, uploads it to the server, and fetches processed data.
   *
   * @param {Event} event - File input change event.
   */
  const handleFileUpload = async (event) => {
    const file = event.target.files[0]; // Get the selected file

    // Validate file type
    if (!file || file.type !== "text/csv") {
      setError("Invalid file type. Please upload a valid CSV file.");
      return;
    }

    // Clear previous error and chart data
    setError(null);
    setChartData(null);

    // Prepare file for upload
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Upload the file to the server
      const uploadResponse = await fetch("http://localhost:8000/api/upload/", {
        method: "POST",
        body: formData,
      });

      // Check if the upload was successful
      if (!uploadResponse.ok) {
        const error = await uploadResponse.json();
        throw new Error(error.detail || "File upload failed.");
      }

      // Extract the file path from the upload response
      const { file_path } = await uploadResponse.json();

      // Process the uploaded file
      const processResponse = await fetch(
        `http://localhost:8000/api/process/?file_name=${encodeURIComponent(
          file_path
        )}`
      );

      // Check if the processing was successful
      if (!processResponse.ok) {
        const error = await processResponse.json();
        throw new Error(error.detail || "File processing failed.");
      }

      // Fetch and update the processed data
      const processedData = await processResponse.json();
      setChartData(processedData);
    } catch (err) {
      // Handle and log errors
      console.error("Error:", err);
      setError(err.message);
    }
  };

  /**
   * Clears the file input field.
   */
  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input value
    }
  };

  // Expose the reset functionality through the ref
  React.useImperativeHandle(resetRef, () => ({
    resetFileInput: clearFileInput,
  }));

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        style={{ marginBottom: "10px" }}
        data-testid="file-input"
      />
    </div>
  );
};

// Define the expected prop types
FileUpload.propTypes = {
  setChartData: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  resetRef: PropTypes.object.isRequired,
};

export default FileUpload;
