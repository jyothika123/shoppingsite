import React from "react";
import ReactDOM from "react-dom/client"; // Use createRoot for React 18+
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import ProductList from "./ProductList";
import ShoppingCart from "./ShoppingCart";
import Account from "./Account";
import Comments from "./Comments";
import { CartProvider } from "./CartContext";
import ProductDetails from "./ProductDetails";
import { AuthProvider } from "./context/AuthContext";  // Import the authentication provider
import Login from "./components/Login";  // Import the login component
import { AccountProvider } from './context/AccountContext';

function App() {
  return (
    <Router>
      
      <AuthProvider><AccountProvider>
        <CartProvider>
          <Header />
          <div className="container mx-auto p-6">
            <Login />  {/* Login element appears on every page */}
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<ShoppingCart />} />
              <Route path="/account" element={<Account />} />
              <Route path="/comments" element={<Comments />} />
            </Routes>
          </div>
        </CartProvider> </AccountProvider>
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