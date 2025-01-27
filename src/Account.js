import React, { useState } from "react";
import { useAuth } from "../src/context/AuthContext"; // Import the useAuth hook

function Account() {
  const { user, login, register, logout, error, isLoggedIn, updateUser } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // State for user details
  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState(user?.address || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegistering) {
      // Register the user
      register(username, password, name, email, address);
    } else {
      // Login the user
      login(username, password);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    // Update the user details (assuming `updateUser` is a function in AuthContext)
    const updatedUser = { username, password, name, email, address };

    // Include password only if it's not empty (i.e., the user wants to update it)
    if (password) {
      updatedUser.password = password;
    }

    updateUser(updatedUser);
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className="container mx-auto p-6">
      {!isLoggedIn && (
        <>
          <h1 className="text-3xl font-bold mb-6">
            {isRegistering ? "Register" : "Login"} to Your Account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <>
                <div>
                  <label className="block text-gray-700">Username</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    className="w-full border rounded p-2"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Address</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    className="w-full border rounded p-2"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </>
            )}

            {!isRegistering && (
              <>
                <div>
                  <label className="block text-gray-700">Username</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    className="w-full border rounded p-2"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </>
            )}

            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {isRegistering ? "Register" : "Login"}
            </button>
          </form>

          <div className="mt-4">
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-blue-600 hover:underline"
            >
              {isRegistering
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </button>
          </div>
          {error && <p className="text-red-600 mt-4">{error}</p>}
        </>
      )}

      {isLoggedIn && (
        <div className="mt-6">
          <h1 className="text-3xl font-bold">Welcome, {user.username}!</h1>
          {!isEditing ? (
            <div className="mt-4">
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Address: {user.address}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
              >
                Edit Details
              </button>
            </div>
          ) : (
            <form onSubmit={handleEdit} className="space-y-4 mt-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full border rounded p-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full border rounded p-2"
                  placeholder="Enter your new password (optional)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                type="button"
                className="ml-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </form>
          )}
          <button
            onClick={logout}
            className="text-blue-600 hover:underline mt-4"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Account;