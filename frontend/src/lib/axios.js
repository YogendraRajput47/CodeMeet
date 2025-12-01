// import axios from "axios";



// // const axiosInstance = axios.create({
// //   baseURL: import.meta.env.VITE_API_URL,
// //   headers:getToken();
// //   //By adding this field browser will send the cookie to server automatically, on every single req
// // });

// // export default axiosInstance;




// src/lib/axiosInstance.js
import axios from "axios";

// Your backend API URL (from Vite environment)
const baseURL = import.meta.env.VITE_API_URL;

/**
 * Create axios instance
 */
const axiosInstance = axios.create({
  baseURL,
  withCredentials: false, // you're using token-based auth now
});

/**
 * GLOBAL TOKEN INTERCEPTOR
 *
 * Automatically attaches the Clerk token to EVERY request.
 * No need to manually add headers in components.
 */
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      // Try to get the token from Clerk (SSR-safe, browser-safe)
      const token =
        (await window?.Clerk?.session?.getToken?.()) ||
        (await window?.Clerk?.getToken?.()) ||
        null;

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn("Clerk token fetch failed:", err);
      }
    }

    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosInstance;
