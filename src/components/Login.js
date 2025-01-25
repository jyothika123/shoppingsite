import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { user, login, logout, error } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      login(username, password);
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