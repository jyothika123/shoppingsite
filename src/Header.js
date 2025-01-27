import React from "react";
import { Link } from "react-router-dom";
import { useAccount } from "./context/AccountContext";
import { useAuth } from "../src/context/AuthContext";  // Importing the context

function Header() {
  const { user, isLoggedIn} = useAuth();
  const { account, logout} = useAccount();
   // Accessing account and logout from context

  // Handle logout functionality
  const handleLogout = (e) => {
    e.preventDefault();
    logout(); // Trigger the logout function
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <h1 className="text-3xl font-extrabold tracking-wide">
          <Link to="/" className="hover:text-yellow-400 transition duration-200 ease-in-out">
            QuickBasket
          </Link>
        </h1>

        {/* Welcome Message Section */}
        <div className="hidden md:block text-yellow-400 font-semibold text-lg">
          {isLoggedIn ? (
            <span>Welcome, {user.username}!</span>
          ) : (
            <Link
              to="/login"
              className="hover:text-yellow-400 transition duration-200 ease-in-out transform hover:scale-105"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      <div className="container mx-auto flex justify-between items-center mt-4">
        {/* Navigation Links */}
        <div className="space-x-8 text-lg font-semibold">
          <Link
            to="/"
            className="hover:text-yellow-400 transition duration-200 ease-in-out transform hover:scale-105"
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="hover:text-yellow-400 transition duration-200 ease-in-out transform hover:scale-105"
          >
            Cart
          </Link>
          <Link
            to="/account"
            className="hover:text-yellow-400 transition duration-200 ease-in-out transform hover:scale-105"
          >
            Account
          </Link>
          <Link
            to="/comments"
            className="hover:text-yellow-400 transition duration-200 ease-in-out transform hover:scale-105"
          >
            Comments
          </Link>

          {/* Logout Link */}
          {!account.isAnonymous && (
            <Link
              to="/"
              onClick={handleLogout} // Call the logout function
              className="hover:text-yellow-400 transition duration-200 ease-in-out transform hover:scale-105 text-red-600"
            >
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
