import React, { useState, useEffect } from "react";
import axios from "axios";
import "./viralproducts.css";
import { backendUrl, currency } from "../App";
import { useCart } from "../context/CartContext";

function ViralProducts() {
  const [viralProductsList, setViralProductsList] = useState([]);
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
    const fetchViralProducts = async () => {
      try {
        const response = await axios.get(backendUrl + "/api/product/display");

        if (response.status === 200) {
          const filteredViralProducts = response.data.products
            .filter((product) => product.viralProduct)
            .slice(0, 8);
          setViralProductsList(filteredViralProducts);
        } else {
          console.error("Failed to fetch products:", response.status);
        }
      } catch (error) {
        console.error("Error fetching viral products:", error);
      }
    };

    fetchViralProducts();
  }, []);

  return (
    <>
      <div className="viralproducts">
        <h2>Viral Products</h2>
        <div className="container">
          {viralProductsList.length > 0 ? (
            viralProductsList.map((product) => {
              const selectedColor = "Black";
              // Construct the cart item ID to match the backend structure
              const cartItemId = `${product._id}_${selectedColor}`;
              // Get the quantity of this specific product+color combination from the cart
              const currentQuantity = cart[cartItemId]?.quantity || 0;

              return (
                <div key={product._id} className="item">
                  <img src={product.image[0]} alt={product.name} />
                  <h4>{product.name}</h4>
                  <p>
                    {currency} {product.price}
                  </p>
                  {/* Display the selected color if applicable
                  {selectedColor && <p>Color: {selectedColor}</p>} */}

                  {currentQuantity > 0 ? (
                    <div className="quantity-controls">
                      {/* Pass productId and color to decrementQuantity */}
                      <button
                        onClick={() =>
                          decrementQuantity(product._id, selectedColor)
                        }
                        disabled={cartLoading}
                      >
                        -
                      </button>
                      <span>{currentQuantity}</span>
                      {/* Pass productId and color to incrementQuantity */}
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
                    // Pass productId and color to addToCart
                    <button
                      onClick={() => addToCart(product._id, 1, selectedColor)}
                      disabled={cartLoading}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <p>No viral products found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ViralProducts;
