import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">ShopEasy</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Products
          </Link>
          <Link to="/cart" className="hover:underline">
            Cart
          </Link>
          <Link to="/account" className="hover:underline">
            Account
          </Link>
          <Link to="/comments" className="hover:underline">
            Comments
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;