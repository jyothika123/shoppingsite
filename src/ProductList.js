import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { products } from "./data"; // Assuming you have a `data.js` file with product info.

function ProductList() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost/sem2/assignment1/shopping-website/src/get_products.php")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // State to manage quantity for each product
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 1; // Set default quantity to 1 for each product
      return acc;
    }, {})
  );

  // Track which products are already in the cart
  const [addedToCart, setAddedToCart] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = false; // Initially, no product is added
      return acc;
    }, {})
  );

  // Update the cart in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));

    // Sync addedToCart with cart after every change
    const newAddedToCart = products.reduce((acc, product) => {
      acc[product.id] = cart.some((item) => item.id === product.id);
      return acc;
    }, {});
    setAddedToCart(newAddedToCart);
  }, [cart]);

  const addToCart = (product, quantity) => {
    console.log("prod",product.id,quantity);
    if (quantity <= 0) return; // Prevent adding 0 or negative quantity
  
    const userId = 1; // Assuming user ID is 1 (modify as needed)
  console.log("prod",product.id,quantity);
    fetch("http://localhost/sem2/assignment1/shopping-website/src/add_to_cart.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: product.id,
        quantity: quantity,
        user_id: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Add to cart response:", data);
        if (data.message) {
          // Update local state to reflect that the product is in the cart
          setAddedToCart((prevState) => ({
            ...prevState,
            [product.id]: true, // Mark this product as added
          }));
        } else {
          alert("Error adding product to cart");
        }
      })
      .catch((error) => console.error("Error:", error));
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
              src={`/images/`+product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 ro unded-lg"
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
            
            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(product, quantities[product.id] || 1)} // Use per-product quantity
              className={`mt-4 px-6 py-2 rounded-full ${addedToCart[product.id] ? "bg-green-600" : "bg-blue-600"} text-white hover:bg-blue-700`}
            >
              {addedToCart[product.id] ? "Added to Cart" : "Add to Cart"}
            </button>

            {/* View Details Button (distinct design) */}
            <Link
              to={`/product/${product.id}`}
              className={`mt-4 inline-block text-center py-2 px-6 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white`}
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