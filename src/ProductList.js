import React, { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "./data"; // Assuming you have a `data.js` file with product info.

function ProductList() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  // State to manage quantity for each product
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 1; // Set default quantity to 1 for each product
      return acc;
    }, {})
  );

  const addToCart = (product, quantity) => {
    if (quantity <= 0) return; // Prevent adding 0 or negative quantity
    
    const updatedProduct = { ...product, quantity };
    const existingProduct = cart.find((item) => item.id === product.id);
    
    if (existingProduct) {
      // Update quantity if product is already in the cart
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      // Add new product with selected quantity
      const updatedCart = [...cart, updatedProduct];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  // Handle change in quantity for each product
  const handleQuantityChange = (id, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: value,
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-lg hover:shadow-xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-green-600 font-bold text-lg">${product.price}</p>

            {/* Quantity Selector for each product */}
            <input
              type="number"
              min="1"
              value={quantities[product.id] || 1}  // Use per-product quantity
              onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
              className="mt-4 px-4 py-2 border rounded-md"
              placeholder="Quantity"
            />
            
            <button
              onClick={() => addToCart(product, quantities[product.id] || 1)} // Use per-product quantity
              className="mt-4 px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Add to Cart
            </button>

            {/* Link to product details */}
            <Link
              to={`/product/${product.id}`}
              className="text-blue-600 mt-4 inline-block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;