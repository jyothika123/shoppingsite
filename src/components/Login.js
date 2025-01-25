import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { user, login, logout } = useAuth();
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username.trim()) {
      login(username);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow-md mb-6">
      {user ? (
        <div className="flex items-center justify-between">
          <p className="text-green-600 font-semibold">Welcome, {user}!</p>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded p-2 w-full"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;