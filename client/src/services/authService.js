import api from "./api"; // your axios instance

export const loginUser = async (credentials) => {
  const res = await api.post("/users/login", credentials);
  return res.data; // should contain token + user info
};

export const registerUser = async (userData) => {
  const res = await api.post("/users/register", userData);
  return res.data; // might contain user info too
};

export const getProfile = async () => {
  const res = await api.get("/users/profile");
  return res.data;
};
