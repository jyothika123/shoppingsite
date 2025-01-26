import React, { useEffect } from "react";
import ReactDOM from "react-dom/client"; // Use createRoot for React 18+
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./Header";
import ProductList from "./ProductList";
import ShoppingCart from "./ShoppingCart";
import Account from "./Account";
import Comments from "./Comments";
import { CartProvider } from "./CartContext";
import ProductDetails from "./ProductDetails";
import { AuthProvider } from "./context/AuthContext";  // Import the authentication provider
import Login from "./components/Login";  // Import the login component
import { AccountProvider, useAccount } from './context/AccountContext'; // Import useAccount hook

function App() {
  return (
    <Router>
      <AuthProvider>
        <AccountProvider>
          <CartProvider>
            <Header />
            <div className="container mx-auto p-6">
              <Routes>
                {/* Define the route for the login page */}
                <Route path="/login" element={<Login />} />

                {/* Account page should allow login or registration */}
                <Route 
                  path="/account" 
                  element={<Account />}  // Account page shows login or register based on state
                />

                {/* Routes for products, cart, and comments */}
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/comments" element={<Comments />} />
              </Routes>
            </div>
          </CartProvider>
        </AccountProvider>
      </AuthProvider>
    </Router>
  );
}

// Using ReactDOM.createRoot for React 18+
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found. Please ensure there is a <div id='root'></div> in your index.html.");
}

export default App;
