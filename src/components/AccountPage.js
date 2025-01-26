import React, { useState, useEffect } from "react";
import { useAccount } from "./context/AccountContext";

function AccountPage() {
  const { account, createAccount, updateAccount, logout, purchaseAnonymously } = useAccount();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!account.isAnonymous) {
      setUsername(account.username || "");
      setEmail(account.email || "");
      setPhoneNumber(account.phoneNumber || "");
      setShippingAddress(account.shippingAddress || "");
      setPassword(""); // Don't prefill the password field
    } else {
      resetForm();
    }
  }, [account]);

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPhoneNumber("");
    setShippingAddress("");
    setPassword("");
    setErrors({});
    setSuccessMessage("");
  };

  const validateFields = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required.";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "A valid email is required.";
    if (!shippingAddress.trim()) newErrors.shippingAddress = "Shipping address is required.";
    if (!password.trim()) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateAccount = () => {
    if (validateFields()) {
      createAccount(username, shippingAddress);
      setSuccessMessage("Account created successfully!");
      resetForm(); // Reset form after successful account creation
    }
  };

  const handleUpdateAccount = () => {
    if (shippingAddress.trim()) {
      updateAccount(shippingAddress);
      setSuccessMessage("Account updated successfully!");
    } else {
      setErrors({ shippingAddress: "Shipping address is required." });
    }
  };

  const handleLogout = () => {
    logout();
    resetForm();
  };

  const handleAnonymousPurchase = () => {
    if (shippingAddress.trim()) {
      purchaseAnonymously(shippingAddress);
    } else {
      setErrors({ shippingAddress: "Shipping address is required for anonymous purchase." });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        {account.isAnonymous ? "Create Account or Continue Shopping" : "Edit Your Account"}
      </h1>

      {successMessage && (
        <p className="text-green-600 mb-4">{successMessage}</p>
      )}

      {account.isAnonymous ? (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
          />
          {errors.username && <p className="text-red-600">{errors.username}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
          />
          {errors.email && <p className="text-red-600">{errors.email}</p>}
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
          {errors.shippingAddress && <p className="text-red-600">{errors.shippingAddress}</p>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
          />
          {errors.password && <p className="text-red-600">{errors.password}</p>}
          <button
            onClick={handleCreateAccount}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
          >
            Create Account
          </button>
          <button
            onClick={handleAnonymousPurchase}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Purchase Anonymously
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
          {errors.shippingAddress && <p className="text-red-600">{errors.shippingAddress}</p>}
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
            type="password"
            placeholder="Change Password (Optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
          />
          <button
            onClick={handleUpdateAccount}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
          >
            Update Account
          </button>
        </div>
      )}

      <button
        onClick={handleLogout}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 mt-6"
      >
        Logout
      </button>
    </div>
  );
}

export default AccountPage;
