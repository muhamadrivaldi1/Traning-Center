import axios from "axios";

// ===============================
// Inisialisasi instance Axios
// ===============================
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ wajib kalau backend pakai cookie (Sanctum)
});

// ===============================
// Interceptor untuk menambahkan token Bearer
// ===============================
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ===============================
// Interceptor response (opsional: handle 401 global)
// ===============================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Jika token invalid atau expired, bisa auto redirect ke login
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
