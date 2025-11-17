import axios from "axios";

// Base URL (must be HTTPS in production)
const baseURL = process.env.NEXT_PUBLIC_API_URL || "/api";

// Enforce HTTPS in production
if (
  typeof window !== "undefined" &&
  process.env.NODE_ENV === "production" &&
  !baseURL.startsWith("https://")
) {
  throw new Error("Production API must use HTTPS for HIPAA compliance");
}

// Create Axios instance
export const api = axios.create({
  baseURL,
  timeout: 30000,
  withCredentials: true, // Required for httpOnly cookie-based authentication
});

// --- Request Interceptor (NO TOKEN IN LOCALSTORAGE — HIPAA SAFE) ---
api.interceptors.request.use(
  (config) => {
    // No tokens injected manually.
    // httpOnly cookies are automatically included with `withCredentials: true`
    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", sanitizeError(error));
    return Promise.reject(sanitizeError(error));
  }
);

// --- Response Interceptor ---
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const normalizedError = sanitizeError(error);

    // Optional: retry logic for network failures
    const originalRequest = error.config;

    if (
      !originalRequest._retry &&
      !error.response &&
      navigator.onLine &&
      error.code === "ECONNABORTED"
    ) {
      originalRequest._retry = true;
      return api(originalRequest);
    }

    // 401 handling (unauthorized)
    if (normalizedError.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    // Return sanitized HIPAA-safe error
    return Promise.reject(normalizedError);
  }
);

// --- Sanitize ALL Errors so no PHI leaks ---
function sanitizeError(error) {
  return {
    status: error?.response?.status || null,
    message:
      error?.response?.data?.message ||
      error.message ||
      "Unexpected server error",
    // NEVER include raw response data (may contain PHI)
    data: null,
  };
}

export default api;
