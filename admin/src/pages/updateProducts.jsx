import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
// import "./updateProducts.css";
import { backendUrl } from "../App";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faImage } from "@fortawesome/free-solid-svg-icons";
import { useParams, useLocation } from "react-router-dom";
function UpdateProducts({ setToken, token }) {
  const { productId: paramProductId } = useParams();
  const location = useLocation();

  const [productId, setProductId] = useState(() => {
    if (location.state && location.state.productId) {
      return location.state.productId;
    }
    if (paramProductId) {
      return paramProductId;
    }
    return null;
  });

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");

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

  useEffect(() => {
    const fetchProductDetails = async (id) => {
      if (!id) {
        console.warn(
          "Product ID is not available for fetching details. Skipping API call."
        );
        return;
      }
      try {
        const response = await axios.put(
          backendUrl + "/api/product/update",
          { productId: id },
          { headers: { token } }
        );

        const product = response.data.product;

        setName(product.name || "");
        setBrand(product.brand || "");
        setCategory(product.category || "");
        setDescription(product.description || "");
        setPrice(product.price || "");
        setColor(product.color ? product.color.split(",") : []);
        setCountInStock(product.countInStock || "");
        setRating(product.rating || "");
        setNumReviews(product.numReviews || "");
        setNewArrival(product.newArrival || false);
        setViralProduct(product.viralProduct || false);
        setDate(
          product.timestamps
            ? new Date(product.timestamps).toISOString().split("T")[0]
            : ""
        );

        setImageUrl1(product.image[0] || "");
        setImageUrl2(product.image[1] || "");
        setImageUrl3(product.image[2] || "");
      } catch (error) {
        console.error("Error fetching product details:", error);
        showNotification("Failed to update product. Please try again.");
        // showNotification("Failed to fetch product details. " + (error.response?.data?.message || error.message), "error");
      }
    };

    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId, token, backendUrl]);

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
    }, 5000);
  };

  const dismissNotification = () => {
    setNotification(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!productId) {
      showNotification(
        "Cannot update product: Product ID is missing.",
        "error"
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("productId", productId);
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

      const response = await axios.put(
        backendUrl + "/api/product/update",
        formData,
        { headers: { token } }
      );

      if (response.status === 200) {
        showNotification("Product updated successfully!", "success");
        window.location.href = "/view";
      } else {
        showNotification(
          "Failed to update product. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error updating product:", error);
      showNotification(
          "Failed to update product. Please try again.",
          "error"
        );
      // showNotification(
      //   "Failed to update product. " +
      //     (error.response?.data?.message || error.message),
      //   "error"
      // );
    }
  };

  return (
    <>
      <Sidebar setToken={setToken} />
      <div className="dashboard">
        <h1>Update Product</h1>
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
              onChange={() => setNewArrival(!newArrival)}
            />
            New Arrival
          </label>
          <label>
            <input
              type="checkbox"
              className="trending"
              checked={viralProduct}
              onChange={() => setViralProduct(!viralProduct)}
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
                    alt="Product 1 Preview"
                    className="uploaded-image"
                  />
                ) : imageUrl1 ? (
                  <img
                    src={imageUrl1}
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
                    alt="Product 2 Preview"
                    className="uploaded-image"
                  />
                ) : imageUrl2 ? (
                  <img
                    src={imageUrl2}
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
                    alt="Product 3 Preview"
                    className="uploaded-image"
                  />
                ) : imageUrl3 ? (
                  <img
                    src={imageUrl3}
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
        <button type="submit">Update Product</button>
      </form>

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

export default UpdateProducts;
