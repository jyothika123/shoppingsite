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

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/account" element={<Account />} />
        <Route path="/comments" element={<Comments />} />
      </Routes>
    </Router>
  );
}

// Using ReactDOM.createRoot for React 18+
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <CartProvider>
        <App />
      </CartProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found. Please ensure there is a <div id='root'></div> in your index.html.");
}

export default App;