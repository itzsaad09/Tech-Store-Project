import React, { useState, useEffect } from "react";
import axios from "axios";
import "./newarrivals.css";
import { backendUrl, currency } from "../App";
import { useCart } from "../context/CartContext";

function NewArrivals() {
  const [newArrivalsList, setNewArrivalsList] = useState([]);
  // Get cart state and functions from the global context
  const {
    cart,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    loading: cartLoading,
    error: cartError,
  } = useCart();

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(backendUrl + "/api/product/display");

        if (response.status === 200) {
          const filteredNewArrivals = response.data.products
            .filter((product) => product.newArrival)
            .slice(0, 8);
          setNewArrivalsList(filteredNewArrivals);
        } else {
          console.error("Failed to fetch products:", response.status);
        }
      } catch (error) {
        console.error("Error fetching new arrival products:", error);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <>
      <div className="newarrivals">
        <h2>New Arrivals</h2>
        <div className="container">
          {newArrivalsList.length > 0 ? (
            newArrivalsList.map((product) => {
              const selectedColor = "Black";

              // Construct the cart item ID to match the backend structure (e.g., "productId_color")
              // This key is used to check if the item is already in the cart.
              const cartItemId = `${product._id}_${selectedColor}`;
              // Get the quantity of this specific product+color combination from the cart
              // If the item doesn't exist in the cart or its quantity is not defined, default to 0.
              const currentQuantity = cart[cartItemId]?.quantity || 0;

              return (
                <div key={product._id} className="item">
                  <img src={product.image[0]} alt={product.name} />
                  <h4>{product.name}</h4>
                  <p>
                    {currency} {product.price}
                  </p>

                  {currentQuantity > 0 ? (
                    <div className="quantity-controls">
                      {/* Pass productId and selectedColor to decrementQuantity */}
                      <button
                        onClick={() =>
                          decrementQuantity(product._id, selectedColor)
                        }
                        disabled={cartLoading}
                      >
                        -
                      </button>
                      <span>{currentQuantity}</span>
                      {/* Pass productId and selectedColor to incrementQuantity */}
                      <button
                        onClick={() =>
                          incrementQuantity(product._id, selectedColor)
                        }
                        disabled={cartLoading}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    // Pass productId, default quantity (1), and selectedColor to addToCart.
                    // Disable the button if cart is loading or if no valid color is available (empty selectedColor).
                    <button
                      onClick={() => addToCart(product._id, 1, selectedColor)}
                      disabled={cartLoading || !selectedColor}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <p>No new arrival products found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default NewArrivals;
