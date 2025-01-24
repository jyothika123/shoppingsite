import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-wide">
          <Link to="/" className="hover:text-yellow-400 transition duration-200 ease-in-out">
            QuickBasket
          </Link>
        </h1>
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
        </div>
      </div>
    </nav>
  );
}

export default Header;