import api from "../api";

export const uploadCSV = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/etl/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getETLHistory = () => api.get("/etl/history");

export const downloadReport = () =>
  api.get("/etl/report/download", { responseType: "blob" });

export const getAnalytics = () => api.get("/etl/analytics");
