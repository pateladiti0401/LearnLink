import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optionally add interceptors
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("token: ", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid, remove it and redirect to login
      localStorage.removeItem("token");
      window.location.href = "/authentication/sign-in";
    }
    return Promise.reject(error);
  }
);

export default api;
