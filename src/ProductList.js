import React, { useEffect, useState } from "react";
import { products } from "./data";
import { motion } from "framer-motion";

function ProductList() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (product) => {
    if (!cart.some((item) => item.id === product.id)) {
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const isInCart = (product) => cart.some((item) => item.id === product.id);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="border p-4 rounded-lg shadow hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <img src={product.image} alt={product.name} className="w-full mb-4" />
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-green-600 font-bold">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className={`mt-4 px-4 py-2 rounded ${
                isInCart(product)
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              disabled={isInCart(product)}
            >
              {isInCart(product) ? "Added" : "Add to Cart"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;