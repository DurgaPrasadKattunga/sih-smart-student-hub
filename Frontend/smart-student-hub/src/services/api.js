import axios from "axios";

const api = axios.create({
  // ✅ Use Vite env variable (must start with VITE_)
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default api;