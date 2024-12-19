const BASE_URL = "http://localhost:8000/api";

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/upload/`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "File upload failed.");
  }

  return response.json();
};

export const processFile = async (fileName) => {
  const response = await fetch(
    `${BASE_URL}/process/?file_name=${encodeURIComponent(fileName)}`
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "File processing failed.");
  }

  return response.json();
};
