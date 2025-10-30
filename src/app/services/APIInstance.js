import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "/api";

// Create axios instance
export const api = axios.create({
  baseURL,
  timeout: 30000,
});

// Request interceptor: attach token if available
api.interceptors.request.use((config) => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {}
  return config;
});

// Response interceptor: normalize errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalizedError = {
      status: error.response?.status,
      message:
        error.response?.data?.message || error.message || "Unexpected error occurred",
      data: error.response?.data,
    };
    return Promise.reject(normalizedError);
  }
);

export default api;


