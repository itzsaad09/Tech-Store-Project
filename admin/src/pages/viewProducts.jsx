import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import "./viewProducts.css";
import { backendUrl, currency } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function ViewProducts({ setToken, token }) {
  // State to store the list of products fetched from the backend and currently displayed
  const [listItems, setListItems] = useState([]);
  // State to store all products fetched, used for pagination
  const [allProducts, setAllProducts] = useState([]);
  // State for displaying notification messages to the user
  const [notification, setNotification] = useState(null);
  // State for pagination: current page and number of products per page
  const [productsPerPage] = useState(6); // Show 6 products at a time
  const [currentPage, setCurrentPage] = useState(1);
  // State to indicate if there are more products to load
  const [hasMore, setHasMore] = useState(true);

  // Initialize the navigate hook from react-router-dom for navigation
  const navigate = useNavigate();

  // Function to display a notification message
  const showNotification = (message, type) => {
    setNotification({ message, type });
    // Automatically dismiss the notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Function to manually dismiss the notification
  const dismissNotification = () => {
    setNotification(null);
  };

  // Function to fetch the list of products from the backend API
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/display");

      if (response.status !== 200) {
        throw new Error("Failed to fetch products");
      } else {
        // Sort products alphabetically by name
        const sortedProducts = response.data.products.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setAllProducts(sortedProducts); // Store all sorted products
        setListItems(sortedProducts.slice(0, productsPerPage)); // Display first 6
        setHasMore(sortedProducts.length > productsPerPage); // Check if there are more products
        console.log("Fetched products:", sortedProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      showNotification("Failed to fetch products. Please try again.", "error");
    }
  };

  // Function to load more products when scrolling
  const loadMoreProducts = () => {
    if (!hasMore) return; // Loading if no more products

    const nextPage = currentPage + 1;
    const startIndex = currentPage * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const newProducts = allProducts.slice(startIndex, endIndex);

    setListItems((prevItems) => [...prevItems, ...newProducts]);
    setCurrentPage(nextPage);
    setHasMore(allProducts.length > endIndex);
  };

  // Function to remove a product by its ID
  const removeItem = async (productId) => {
    try {
      const response = await axios.delete(backendUrl + "/api/product/delete", {
        data: { productId },
      });

      if (response.status !== 200) {
        throw new Error("Failed to delete product");
      } else {
        // Re-fetch the list to update the UI and re-apply sorting
        await fetchList();
        showNotification("Product deleted successfully!", "success");
        console.log("Product deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      showNotification("Failed to delete product. Please try again.", "error");
    }
  };

  // Function to handle the edit button click
  const handleEditClick = (productId) => {
    navigate("/update", { state: { productId: productId } });
  };

  // useEffect hook to fetch products when the component mounts
  useEffect(() => {
    fetchList();
  }, []); // Empty dependency array ensures this runs only once on mount

  // useEffect hook for infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled to the bottom of the page
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 // -100 for a small buffer
      ) {
        loadMoreProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, [hasMore, currentPage, allProducts]); // Dependencies for scroll handler

  return (
    <>
      <Sidebar setToken={setToken} />
      <div className="dashboard">
        <h1>View Products</h1>
      </div>
      <div className="product-list">
        {listItems.map((item) => (
          <div key={item._id} className="product-card">
            <img src={item.image[0]} alt={item.name} />
            <h2>{item.name}</h2>
            <p>
              <b>{currency}</b>
              {item.price}
            </p>
            <p>
              <b>Stock: </b> {item.countInStock}
            </p>
            <p>
              <b>Color: </b> {item.color}
            </p>
            <p>
              <b>New Arrival: </b> {item.newArrival ? "Yes" : "No"}
            </p>
            <p>
              <b>Viral Product: </b> {item.viralProduct ? "Yes" : "No"}
            </p>
            <FontAwesomeIcon
              icon={faEdit}
              className="edit-icon"
              onClick={() => handleEditClick(item._id)}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className="delete-icon"
              onClick={() => removeItem(item._id)}
            />
          </div>
        ))}
      </div>

      {/* Notification display area */}
      {notification && (
        <ul className="notifications">
          <li className={`notification-item ${notification.type}`}>
            <div className="notification-content">
              <div className="notification-icon" aria-hidden="true">
                {notification.type === "success" ? (
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-8.67"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                ) : (
                  <svg
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <circle cx="12" cy="16" r="1" />
                  </svg>
                )}
              </div>
              <div className="notification-text">{notification.message}</div>
              <button
                onClick={dismissNotification}
                className="notification-icon notification-close"
                aria-label="Dismiss notification"
                type="button"
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="notification-progress-bar" />
          </li>
        </ul>
      )}
    </>
  );
}

export default ViewProducts;