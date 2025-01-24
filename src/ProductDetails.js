import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "./data"; // Assuming you have a `data.js` file with product info.

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((prod) => prod.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    if (quantity <= 0) return; // Prevent adding 0 or negative quantity
    const updatedProduct = { ...product, quantity };
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = savedCart.find((item) => item.id === product.id);

    if (existingProduct) {
      const updatedCart = savedCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      savedCart.push(updatedProduct);
      localStorage.setItem("cart", JSON.stringify(savedCart));
    }

    // Redirect to the cart page after adding the product
    navigate("/cart");
  };

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">{product.name}</h1>
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-gray-600 mb-4 text-lg">{product.description}</p>
          <p className="text-green-600 font-bold text-2xl">${product.price}</p>

          {/* Quantity Selector */}
          <div className="mt-4">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="px-4 py-2 border rounded-md w-20 text-center"
            />
          </div>
          
          {/* Add to Cart Button */}
          <button
            onClick={addToCart}
            className="mt-6 px-8 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;