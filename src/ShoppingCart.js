import React, { useState, useEffect } from "react";

function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const userId = 1; // Replace with actual user ID

  useEffect(() => {
    fetch(`http://localhost/sem2/assignment1/shopping-website/src/cart.php?user_id=${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        setCart(data);
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
        setError(error.message);
      });
  }, []);

  // Function to remove item from cart
  const removeItem = (id) => {
    fetch(`http://localhost/sem2/assignment1/shopping-website/src/cart.php?item_id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text()) // Get the raw response as text
      .then((data) => {
        console.log("Server response:", data); // Log the raw response
        try {
          const jsonData = JSON.parse(data); // Parse the response into JSON
          const updatedCart = cart.filter((item) => item.id !== id);
          setCart(updatedCart);
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        } catch (error) {
          console.error("Error parsing response:", error);
          setError("Failed to parse server response");
        }
      })
      .catch((error) => {
        console.error("Error removing item:", error);
        setError(error.message);
      });
  };
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Shopping Cart</h1>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((item) => (
              <div key={item.id} className="border p-4 rounded-lg shadow-lg">
                <img
                  src={`/images/`+item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover mb-4 rounded-lg"
                />
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
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
              Total: $
              {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
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