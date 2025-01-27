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
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = storedUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      setUser({ username: foundUser.username, name: foundUser.name });
      setError(null); // Clear any previous errors
      localStorage.setItem("user", JSON.stringify({ username: foundUser.username, name: foundUser.name }));
    } else {
      setError("Invalid credentials or user not found");
    }
  };

  // Register function
  const register = (username, password, name, email, address) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the user already exists
    const existingUser = storedUsers.find((user) => user.username === username);
    if (existingUser) {
      setError("User already registered");
      return;
    }

    const newUser = { username, password, name, email, address };
    storedUsers.push(newUser);

    // Save the users list to localStorage
    localStorage.setItem("users", JSON.stringify(storedUsers));
    setUser({ username: newUser.username, name: newUser.name });
    setError(null); // Clear any previous errors
  };

  // Update user function
  const updateUser = (updatedUserData) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user to update
    const storedUserIndex = storedUsers.findIndex((user) => user.username === updatedUserData.username);
    if (storedUserIndex === -1) {
      setError("No user found to update");
      return;
    }

    // Merge updated data with the existing user data
    const updatedUser = { ...storedUsers[storedUserIndex], ...updatedUserData };

    // Update users list in localStorage and state
    storedUsers[storedUserIndex] = updatedUser;
    localStorage.setItem("users", JSON.stringify(storedUsers));
    setUser(updatedUser);
    setError(null); // Clear any previous errors
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setError(null);
  };

  const isLoggedIn = user !== null;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, updateUser, error, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
