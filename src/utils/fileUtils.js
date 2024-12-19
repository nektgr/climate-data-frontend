// src/api/fileApi.js

const BASE_URL = "http://localhost:8000/api";

/**
 * Uploads a file to the server.
 *
 * @param {File} file - The file to be uploaded.
 * @returns {Promise<object>} - The server response containing file information.
 * @throws {Error} - Throws an error if the upload fails.
 */
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${BASE_URL}/upload/`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "File upload failed.");
    }

    return await response.json(); // Parse and return the JSON response
  } catch (err) {
    console.error("Error during file upload:", err);
    throw err; // Re-throw the error for higher-level handling
  }
};

/**
 * Processes a file on the server.
 *
 * @param {string} fileName - The name of the file to be processed.
 * @returns {Promise<object>} - The server response containing processed data.
 * @throws {Error} - Throws an error if the processing fails.
 */
export const processFile = async (fileName) => {
  try {
    const response = await fetch(
      `${BASE_URL}/process/?file_name=${encodeURIComponent(fileName)}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "File processing failed.");
    }

    return await response.json(); // Parse and return the JSON response
  } catch (err) {
    console.error("Error during file processing:", err);
    throw err; // Re-throw the error for higher-level handling
  }
};
