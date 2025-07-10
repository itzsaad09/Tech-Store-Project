import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import "./addProducts.css";
import { backendUrl } from "../App";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faImage } from "@fortawesome/free-solid-svg-icons";

function AddProducts({ setToken, token }) {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState([]);
  const [countInStock, setCountInStock] = useState("");
  const [rating, setRating] = useState("");
  const [numReviews, setNumReviews] = useState("");
  const [newArrival, setNewArrival] = useState(false);
  const [viralProduct, setViralProduct] = useState(false);
  const [date, setDate] = useState("");

  const [notification, setNotification] = useState(null);

  const toggleColor = (value) => {
    if (color.includes(value)) {
      setColor(color.filter((c) => c !== value));
    } else {
      setColor([...color, value]);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const dismissNotification = () => {
    setNotification(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("countInStock", countInStock);
      formData.append("color", color.join(","));
      formData.append("rating", rating);
      formData.append("numReviews", numReviews);
      formData.append("newArrival", newArrival ? "true" : "false");
      formData.append("viralProduct", viralProduct ? "true" : "false");
      formData.append("date", date);

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.status === 201) {
        showNotification("Product added successfully!", "success");
        setName("");
        setBrand("");
        setCategory("");
        setDescription("");
        setPrice("");
        setColor([]);
        setCountInStock("");
        setRating("");
        setNumReviews("");
        setNewArrival(false);
        setViralProduct(false);
        setDate("");
        setImage1(null);
        setImage2(null);
        setImage3(null);
      } else {
        showNotification("Failed to add product. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      // const errorMessage = error.response?.data?.message || error.message || "Unknown error occurred.";
      showNotification("Failed to add product. Please try again.", "error");
      // showNotification(`Failed to add product: ${errorMessage}`, "error");
    }
  };

  return (
    <>
      <Sidebar setToken={setToken} />
      <div className="dashboard">
        <h1>Add Products</h1>
      </div>
      <form method="post" onSubmit={onSubmit}>
        <div className="rowTwoColumns">
          <div className="productName">
            <label htmlFor="productname">Product Name</label>
            <input
              type="text"
              id="productname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
              required
            />
          </div>
          <div className="brand">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Brand"
              required
            />
          </div>
        </div>
        <div className="categories">
          <label htmlFor="categories">Categories</label>
          <select
            name="categories"
            id="categories"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" hidden>
              Categories
            </option>
            <option value="airpods">Airpods</option>
            <option value="charger&cabels">Charger & Cables</option>
            <option value="gaming">Gaming</option>
            <option value="handsfree">Handsfree</option>
            <option value="headphones">Headphones</option>
            <option value="phoneholder">Phone Holder</option>
            <option value="microphone">Microphone</option>
            <option value="smartwatches">Smart Watches</option>
            <option value="speakers">Speakers</option>
            <option value="tripods">Tripods</option>
          </select>
        </div>
        <div className="description">
          <label htmlFor="description">Product Description</label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            cols="30"
            rows="10"
            placeholder="Product Description"
            required
          ></textarea>
        </div>
        <div className="rowTwoColumns">
          <div className="price">
            <label htmlFor="price">Product Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="price"
              placeholder="Price"
              required
            />
          </div>
          <div className="stock">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              className="stock"
              placeholder="Product Stock"
              required
            />
          </div>
        </div>

        <div className="color">
          <label>Product Color</label>
          <div className="color-options">
            {[
              { name: "Black", value: "#374151", id: "Black", border: false },
              { name: "White", value: "#f3f4f6", id: "White", border: true },
              { name: "Blue", value: "#2a3c4a", id: "Blue", border: false },
              // { name: "Red", value: "#ef4444", id: "red", border: false }, // Uncomment if needed
              // { name: "Blue", value: "#2563eb", id: "blue", border: false }, // Uncomment if needed
            ].map(({ name, id }) => (
              <label key={id} htmlFor={`color-${id}`} className="color-label">
                <input
                  type="checkbox"
                  id={`color-${id}`}
                  name="color"
                  value={id}
                  checked={color.includes(id)}
                  onChange={() => toggleColor(id)}
                />
                <span className={`color-swatch color-${id}`}></span>
                {name}
              </label>
            ))}
          </div>
        </div>

        <div className="checkboxes">
          <label>
            <input
              type="checkbox"
              className="newArrival"
              checked={newArrival}
              onChange={() => setNewArrival((prev) => !prev)}
            />
            New Arrival
          </label>
          <label>
            <input
              type="checkbox"
              className="trending"
              checked={viralProduct}
              onChange={() => setViralProduct((prev) => !prev)}
            />
            Trending
          </label>
        </div>
        <div className="image">
          <label>Product Images</label>
          <div className="image-inputs-row">
            <div className="image-input-container">
              <label htmlFor="image1">
                {image1 ? (
                  <img
                    src={URL.createObjectURL(image1)}
                    alt="Product 1"
                    className="uploaded-image"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faImage}
                    className="placeholder-icon"
                  />
                )}
                <input
                  type="file"
                  id="image1"
                  onChange={(e) => setImage1(e.target.files[0])}
                  className="image1"
                  hidden
                />
                <FontAwesomeIcon icon={faUpload} className="upload-icon" />
              </label>
            </div>
            <div className="image-input-container">
              <label htmlFor="image2">
                {image2 ? (
                  <img
                    src={URL.createObjectURL(image2)}
                    alt="Product 2"
                    className="uploaded-image"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faImage}
                    className="placeholder-icon"
                  />
                )}
                <input
                  type="file"
                  id="image2"
                  onChange={(e) => setImage2(e.target.files[0])}
                  className="image2"
                  hidden
                />
                <FontAwesomeIcon icon={faUpload} className="upload-icon" />
              </label>
            </div>
            <div className="image-input-container">
              <label htmlFor="image3">
                {image3 ? (
                  <img
                    src={URL.createObjectURL(image3)}
                    alt="Product 3"
                    className="uploaded-image"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faImage}
                    className="placeholder-icon"
                  />
                )}
                <input
                  type="file"
                  id="image3"
                  onChange={(e) => setImage3(e.target.files[0])}
                  className="image3"
                  hidden
                />
                <FontAwesomeIcon icon={faUpload} className="upload-icon" />
              </label>
            </div>
          </div>
        </div>
        <button type="submit">Add Product</button>
      </form>

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

export default AddProducts;
