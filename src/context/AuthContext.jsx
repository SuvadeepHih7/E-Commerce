"use client";

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedToken !== "undefined" && storedToken !== "null") {
        setToken(storedToken);
      }

      if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Error reading auth data:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, []);

  // Called after login API success
  const login = (data) => {
    try {
      if (data?.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      }

      if (data?.data) {
        localStorage.setItem("user", JSON.stringify(data.data));
        setUser(data.data);
      }
    } catch (err) {
      console.error("Error saving login data:", err);
    }
  };

  // Logout clears everything
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
