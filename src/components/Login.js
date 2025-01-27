import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Account() {
  const { user, login, logout, error } = useAuth(); // Auth context
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Handle login on form submit
  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      login(username, password); // Trigger login if inputs are valid
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Check if user is logged in */}
      {!user ? (
        // Show login form if the user is not logged in
        <div className="p-4 bg-gray-100 rounded shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Login</h2>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded p-2"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded p-2"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
              onClick={handleLogin}
              disabled={!username.trim() || !password.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              Login
            </button>
          </div>
        </div>
      ) : (
        // Show welcome content if the user is logged in
        <div className="mt-6">
          <h1 className="text-3xl font-bold">Welcome, {user.username}!</h1>
          <div className="mt-4">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Address: {user.address}</p>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mt-4"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Additional "Our Products" section or any other content you need */}
      {user && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold">Our Products</h2>
          {/* Products content here */}
        </div>
      )}
    </div>
  );
}

export default Account;
