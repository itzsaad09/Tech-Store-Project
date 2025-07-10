import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { backendUrl } from "../App";

const CartContext = createContext();

// Helper function to decode JWT token and extract payload
const decodeJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Error decoding JWT token:", e);
    return null;
  }
};

export const CartProvider = ({ children }) => {
  // cart will store the object received from the backend, e.g., { "productId_color": { productId, name, price, quantity, color } }
  const [cart, setCart] = useState({});
  const [bill, setBill] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("userToken");

  // Extract userId from the token
  const decodedToken = token ? decodeJwt(token) : null;
  const userId = decodedToken ? decodedToken.id : null; // Assuming 'id' is the field containing the user ID in your JWT payload
  localStorage.setItem("userId", userId);

  // Function to fetch the user's cart from the backend
  const fetchCart = useCallback(async () => {
    if (!userId || !token) {
      setCart({}); // Clear cart if no user ID or token is available
      setBill(0);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${backendUrl}/api/cart/get?userId=${userId}`,
        {
          headers: {
            token: token, // Send authentication token
          },
        }
      );
      setCart(response.data.cartData || {});
      setBill(response.data.bill || 0);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setError("Failed to load cart. Please try again.");
      setCart({});
      setBill(0);
    } finally {
      setLoading(false);
    }
  }, [userId, token]);

  // Fetch cart on component mount and when userId/token changes
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Function to add a product to the cart (or increment its quantity)
  const addToCart = async (productId, quantity = 1, color) => {
    if (!userId || !token) {
      setError("Please log in to add items to your cart.");
      return;
    }
    if (!productId || !color ) {
      setError("Product ID and color are required to add to cart.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/add`,
        {
          userId,
          productId,
          quantity,
          color,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      setCart(response.data.cartData);
      setBill(response.data.bill);
    } catch (err) {
      console.error(
        "Failed to add to cart:",
        err.response ? err.response.data : err.message
      );
      setError(
        err.response ? err.response.data.message : "Failed to add item to cart."
      );
    } finally {
      setLoading(false);
    }
  };

  // Generic function to update an item's quantity in the cart
  const updateCartItemQuantity = async (productId, color, newQuantity) => {
    if (!userId || !token) {
      setError("Please log in to modify your cart.");
      return;
    }
    if (!productId || !color || newQuantity === undefined) {
      setError("Product ID, color, and new quantity are required.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/update`,
        {
          userId,
          productId,
          color,
          quantity: newQuantity,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      setCart(response.data.cartData);
      setBill(response.data.bill);
    } catch (err) {
      console.error(
        "Failed to update cart item quantity:",
        err.response ? err.response.data : err.message
      );
      setError(
        err.response
          ? err.response.data.message
          : "Failed to update item quantity."
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to increment item quantity
  const incrementQuantity = (productId, color) => {
    const cartItemId = `${productId}_${color}`;
    const currentQuantity = cart[cartItemId]?.quantity || 0;
    updateCartItemQuantity(productId, color, currentQuantity + 1);
  };

  // Function to decrement item quantity or remove if quantity becomes 0
  const decrementQuantity = (productId, color) => {
    const cartItemId = `${productId}_${color}`;
    const currentQuantity = cart[cartItemId]?.quantity || 0;
    // If currentQuantity is 1, setting newQuantity to 0 will trigger removal on backend
    // If currentQuantity is already 0, do nothing or send 0 to backend (backend handles it)
    const newQuantity = currentQuantity - 1;
    updateCartItemQuantity(productId, color, newQuantity);
  };

  // Function to remove an item from the cart
  const removeItem = (productId, color) => {
    updateCartItemQuantity(productId, color, 0); // Set quantity to 0 to trigger removal on backend
  };

  // Calculate total number of items in the cart for the Navbar display
  // Sum quantities from all items in the cart object
  // This will correctly reflect removals since the 'cart' state is updated from backend.
  const totalCartItems = Object.values(cart).reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        bill,
        loading,
        error,
        addToCart,
        incrementQuantity,
        decrementQuantity,
        removeItem,
        totalCartItems,
        fetchCart, // Expose fetchCart so components can manually refresh the cart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
