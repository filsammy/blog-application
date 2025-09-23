// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  // Save user in localStorage when state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (credentials) => {
    const data = await loginUser(credentials);

    if (data.accessToken) {
      localStorage.setItem("token", data.accessToken);
      // Store token in user object too for consistency
      setUser({
        ...data.user,
        token: data.accessToken
      });
    }
  };

  const register = async (userData) => {
    const data = await registerUser(userData);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
