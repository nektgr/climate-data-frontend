import React, { useRef } from "react";
import PropTypes from "prop-types";

const FileUpload = ({ setChartData, setError, resetRef }) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || file.type !== "text/csv") {
      setError("Invalid file type. Please upload a valid CSV file.");
      return;
    }

    setError(null);
    setChartData(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadResponse = await fetch("http://localhost:8000/api/upload/", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        const error = await uploadResponse.json();
        throw new Error(error.detail || "File upload failed.");
      }

      const { file_path } = await uploadResponse.json();

      const processResponse = await fetch(
        `http://localhost:8000/api/process/?file_name=${encodeURIComponent(file_path)}`
      );

      if (!processResponse.ok) {
        const error = await processResponse.json();
        throw new Error(error.detail || "File processing failed.");
      }

      const processedData = await processResponse.json();
      setChartData(processedData);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    }
  };

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
      />
    </div>
  );
};

FileUpload.propTypes = {
  setChartData: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  resetRef: PropTypes.object.isRequired,
};

export default FileUpload;
