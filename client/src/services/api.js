// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically if logged in
API.interceptors.request.use((config) => {
  // Get token directly from localStorage (not from user object)
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
