import React, { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { useAccount } from "./context/AccountContext";

function Account() {
  const { user } = useAuth();
  const { account, createAccount, updateAccount, logout } = useAccount();
  const [username, setUsername] = useState(account.username || "");
  const [email, setEmail] = useState(account.email || "");
  const [phoneNumber, setPhoneNumber] = useState(account.phoneNumber || "");
  const [shippingAddress, setShippingAddress] = useState(account.shippingAddress || "");
  const [password, setPassword] = useState(account.password || "");

  useEffect(() => {
    setUsername(account.username || "");
    setEmail(account.email || "");
    setPhoneNumber(account.phoneNumber || "");
    setShippingAddress(account.shippingAddress || "");
    setPassword(account.password || "");
  }, [account]);

  const handleCreateAccount = () => {
    if (username.trim() && email.trim() && shippingAddress.trim() && password.trim()) {
      createAccount(username, email, phoneNumber, shippingAddress, password);
    }
  };

  const handleUpdateAccount = () => {
    if (shippingAddress.trim() || email.trim() || phoneNumber.trim() || password.trim()) {
      updateAccount(shippingAddress, email, phoneNumber, password);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        {account.isAnonymous ? "Create Account or Continue Shopping" : "Edit Your Account"}
      </h1>

      {account.isAnonymous ? (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
          />
          <input
            type="text"
            placeholder="Shipping Address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
          />
          <button
            onClick={handleCreateAccount}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Account
          </button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Shipping Address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
          />
          <input
            type="email"
            placeholder="Update Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
          />
          <input
            type="tel"
            placeholder="Update Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
          />
          <input
            type="password"
            placeholder="Change Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
          />
          <button
            onClick={handleUpdateAccount}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Account
          </button>
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Account;