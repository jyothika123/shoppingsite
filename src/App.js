import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import ProductList from "./ProductList";
import ShoppingCart from "./ShoppingCart";
import Account from "./Account";
import Comments from "./Comments";
import { CartProvider } from "./CartContext";
import ReactDOM from "react-dom";
ReactDOM.render(
  <CartProvider>
    <App />
  </CartProvider>,
  document.getElementById("root")
);
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/account" element={<Account />} />
        <Route path="/comments" element={<Comments />} />
      </Routes>
    </Router>
  );
}

export default App;