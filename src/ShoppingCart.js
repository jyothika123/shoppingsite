import React, { useState } from "react";

function ShoppingCart() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) return; // Prevent negative or zero quantity
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Immediate sync with localStorage
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Immediate sync with localStorage
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((item) => (
              <div key={item.id} className="border p-4 rounded-lg shadow-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover mb-4 rounded-lg"
                />
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex items-center mb-4">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                    className="px-4 py-2 bg-gray-300 rounded-full mr-2"
                  >
                    -
                  </button>
                  <p className="text-lg font-bold">{item.quantity}</p>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                    className="px-4 py-2 bg-gray-300 rounded-full ml-2"
                  >
                    +
                  </button>
                </div>
                <p className="text-green-600 font-bold text-lg">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <p className="text-xl font-bold">
              Total: ${(getTotalPrice()).toFixed(2)}
            </p>
            <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;