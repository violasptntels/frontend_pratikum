import axios from "axios";

// Buat instance axios
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8088/api",
});

// Interceptor REQUEST – tambah token secara otomatis
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token; // langsung pakai token (Paseto)
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor RESPONSE – tangani error 401 (token expired)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); // hapus token
      window.location.href = "/";       // redirect ke login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;