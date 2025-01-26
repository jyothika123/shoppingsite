import React, { createContext, useContext, useState } from "react";

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to provide auth context to children
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Simulate login function
  const login = (username, password) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
      setUser({ username: storedUser.username, name: storedUser.name });
      setError(null); // Clear any previous errors
    } else {
      setError("Invalid credentials or user not found");
    }
  };

  // Register function
  const register = (username, password, name, email, address) => {
    // Check if the user already exists
    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser) {
      setError("User already registered");
      return;
    }

    const newUser = { username, password, name, email, address };

    // Save the user to localStorage
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser({ username: newUser.username, name: newUser.name });
    setError(null); // Clear any previous errors
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setError(null);
  };

  const isLoggedIn = user !== null;
  return (
    <AuthContext.Provider value={{ user, login, logout, register, error, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};