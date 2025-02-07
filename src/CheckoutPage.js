import React, { useState } from "react";

function Checkout() {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleCheckout = () => {
    // Simulate checkout process (can be replaced with API call)
    setTimeout(() => {
      setCheckoutSuccess(true);
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>

      {!checkoutSuccess ? (
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-4">
            confirming your purchase?.
          </p>
          <button
            onClick={handleCheckout}
            className="px-6 py-2 bg-blue-600 text-white rounded-full"
          >
            Place Order
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-green-600">Checkout Successful! 🎉</h2>
          <p className="text-gray-700 mt-2">Thank you for your order.</p>
        </div>
      )}
    </div>
  );
}

export default Checkout;