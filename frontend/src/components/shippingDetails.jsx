import React, { useState, useEffect } from "react";
import "./shippingDetails.css";
import { currency, backendUrl } from "../App";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ShippingDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State to hold cart data
  let cartData = location.state?.cartData;
  if (!cartData) {
    const storedData = localStorage.getItem("cartData");
    if (storedData) {
      try {
        cartData = JSON.parse(storedData);
      } catch (e) {
        console.error("Error parsing cartData from localStorage", e);
      }
    }
  }

  // State for the currently edited/new shipping information
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    stateProvince: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
    shippingMethod: "Standard Shipping",
  });

  // State to store existing shipping addresses fetched from backend
  const [existingShippingDetails, setExistingShippingDetails] = useState([]);
  // State to track the ID of the selected existing address
  const [selectedShippingAddressId, setSelectedShippingAddressId] =
    useState(null);
  // State to control visibility of the new address form
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  // State for loading and error messages
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // State for showing a message box (instead of alert)
  const [messageBox, setMessageBox] = useState({
    visible: false,
    text: "",
    type: "",
  });

  const userId = localStorage.getItem("userId");

  // Function to show a custom message box
  const showMessage = (text, type = "info") => {
    setMessageBox({ visible: true, text, type });
    setTimeout(() => {
      setMessageBox({ visible: false, text: "", type: "" });
    }, 3000);
  };

  useEffect(() => {
    const fetchExistingAddresses = async () => {
      if (!userId) {
        setError("User not logged in. Cannot fetch shipping details.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        // Assuming an API endpoint to fetch user's shipping details
        const response = await axios.get(
          `${backendUrl}/api/user/shipping/${userId}`
        );
        if (response.status === 200) {
          const fetchedDetails = response.data.shippingDetails || [];
          setExistingShippingDetails(fetchedDetails);
          // If there are existing addresses, default to selecting the first one
          if (fetchedDetails.length > 0) {
            setSelectedShippingAddressId(fetchedDetails[0]._id);
            setShippingInfo(fetchedDetails[0]);
            setShowNewAddressForm(false); // Ensure new address form is hidden
          } else {
            // If no existing addresses, show the new address form by default
            setShowNewAddressForm(true);
          }
        } else {
          setError("Failed to fetch existing shipping details.");
          setShowNewAddressForm(true); // Show new form if fetching fails
        }
      } catch (err) {
        console.error("Error fetching existing shipping details:", err);
        setError("Error fetching existing shipping details. Please try again.");
        setShowNewAddressForm(true); // Show new form if fetching fails
      } finally {
        setLoading(false);
      }
    };

    fetchExistingAddresses();
  }, [userId]); // Re-run when userId changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRadioChange = (addressId) => {
    setSelectedShippingAddressId(addressId);
    setShowNewAddressForm(false);
    const selectedAddress = existingShippingDetails.find(
      (addr) => addr._id === addressId
    );
    if (selectedAddress) {
      setShippingInfo(selectedAddress);
    }
  };

  const handleAddNewAddressClick = () => {
    setShowNewAddressForm(true);
    setSelectedShippingAddressId(null);
    setShippingInfo({
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      stateProvince: "",
      postalCode: "",
      country: "",
      phoneNumber: "",
      shippingMethod: "Standard Shipping", // Default method
    });
  };

  const cartItemsArray = cartData?.cart || [];
  const checkedBill = cartData?.checkedBill || 0;
  const shippingFees = cartData?.shippingFees || 0;
  const finalTotalBill = cartData?.finalTotalBill || checkedBill + shippingFees;

  const handleConfirmOrder = async () => {
    if (showNewAddressForm) {
      if (
        !shippingInfo.fullName ||
        !shippingInfo.addressLine1 ||
        !shippingInfo.city ||
        !shippingInfo.stateProvince ||
        !shippingInfo.postalCode ||
        !shippingInfo.country ||
        !shippingInfo.phoneNumber
      ) {
        showMessage("Please fill in all required shipping details.", "error");
        return;
      }
      try {
        setLoading(true); // Set loading while adding new address
        const response = await axios.post(
          `${backendUrl}/api/user/addshipping`,
          {
            userId: userId,
            shippingInfo: shippingInfo,
          }
        );

        if (response.data.success) {
          showMessage("New shipping details added successfully!", "success");
          // The backend should return the updated user object or the new address with its _id
          const updatedUser = response.data.user;
          setExistingShippingDetails(updatedUser.shippingDetails);
          // Set the newly added address as selected
          const newAddress =
            updatedUser.shippingDetails[updatedUser.shippingDetails.length - 1];
          setSelectedShippingAddressId(newAddress._id);
          setShowNewAddressForm(false); // Hide the new address form after successful add

          // Proceed to payment page with the newly added/selected shipping info
          navigate("/payment", {
            state: {
              cartData: cartData,
              shippingInfo: newAddress, // Use the newly added address
            },
          });
        } else {
          showMessage(
            response.data.message || "Failed to add new shipping details.",
            "error"
          );
        }
      } catch (err) {
        console.error("Error adding new shipping details:", err);
        showMessage(
          err.response?.data?.message ||
            "Error adding new shipping details. Please try again.",
          "error"
        );
      } finally {
        setLoading(false);
      }
    } else {
      // If an existing address is selected, just proceed to payment
      if (!selectedShippingAddressId) {
        showMessage(
          "Please select an existing address or add a new one.",
          "error"
        );
        return;
      }
      const selectedAddress = existingShippingDetails.find(
        (addr) => addr._id === selectedShippingAddressId
      );
      if (selectedAddress) {
        navigate("/payment", {
          state: {
            cartData: cartData,
            shippingInfo: selectedAddress,
          },
        });
      } else {
        showMessage("Selected address not found. Please try again.", "error");
      }
    }
  };

  const renderEditableInputField = (
    id,
    label,
    type = "text",
    placeholder = ""
  ) => (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={shippingInfo[id] || ""}
        onChange={handleChange}
        placeholder={placeholder}
        className="form-input"
        required={
          id === "fullName" ||
          id === "addressLine1" ||
          id === "city" ||
          id === "stateProvince" ||
          id === "postalCode" ||
          id === "country" ||
          id === "phoneNumber"
        }
      />
    </div>
  );

  return (
    <div className="app-container">
      {messageBox.visible && (
        <div className={`message-box ${messageBox.type}`}>
          {messageBox.text}
        </div>
      )}
      <form
        className="shipping-form-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleConfirmOrder();
        }}
      >
        <span className="form-main-label">Shipping Details</span>

        {loading && <p>Loading shipping addresses...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <div className="form-section">
            <h2 className="section-title">
              <svg
                className="text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              Select Delivery Address
            </h2>

            {existingShippingDetails.length > 0 ? (
              <div className="existing-addresses-list">
                {existingShippingDetails.map((address) => (
                  <div key={address._id} className="address-item">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="shippingAddress"
                        value={address._id}
                        checked={selectedShippingAddressId === address._id}
                        onChange={() => handleRadioChange(address._id)}
                        className="radio-input"
                      />
                      <span className="address-text">
                        <strong>{address.fullName}</strong>
                        <br />
                        {address.addressLine1}
                        {address.addressLine2 && `, ${address.addressLine2}`}
                        <br />
                        {address.city}, {address.stateProvince}{" "}
                        {address.postalCode}
                        <br />
                        {address.country}
                        <br />
                        Phone: {address.phoneNumber}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-existing-addresses">No saved addresses found.</p>
            )}

            <div className="add-new-address-container">
              <button
                type="button"
                onClick={handleAddNewAddressClick}
                className="add-new-address-button"
              >
                Add New Shipping Details
              </button>
            </div>
          </div>
        )}

        {(showNewAddressForm || existingShippingDetails.length === 0) && (
          <div className="form-section new-address-form">
            <h2 className="section-title">
              <svg
                className="text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              {selectedShippingAddressId && !showNewAddressForm
                ? "Edit Selected Address"
                : "Enter New Delivery Address"}
            </h2>
            {renderEditableInputField(
              "fullName",
              "Full Name",
              "text",
              "John Doe"
            )}
            {renderEditableInputField(
              "addressLine1",
              "Address Line 1",
              "text",
              "123 Main St"
            )}
            {renderEditableInputField(
              "addressLine2",
              "Address Line 2 (Optional)",
              "text",
              "Apt 4B"
            )}
            {renderEditableInputField(
              "phoneNumber",
              "Phone Number",
              "tel",
              "e.g., +92 123 4567890"
            )}
            <div className="address-grid">
              {renderEditableInputField("city", "City", "text", "Lahore")}
              {renderEditableInputField(
                "stateProvince",
                "State/Province",
                "text",
                "Punjab"
              )}
            </div>
            <div className="address-grid">
              {renderEditableInputField(
                "postalCode",
                "Postal Code",
                "text",
                "90210"
              )}
              {renderEditableInputField(
                "country",
                "Country",
                "text",
                "Pakistan"
              )}
            </div>
          </div>
        )}

        <div className="form-section">
          <h2 className="section-title">
            <svg
              className="text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              ></path>
            </svg>
            Order Summary
          </h2>
          <div className="order-item-list">
            {cartItemsArray.length > 0 ? (
              cartItemsArray.map((item) => (
                <div
                  key={`${item.productId}_${item.color || item.id}`}
                  className="order-item"
                >
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>
                    {currency}
                    {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))
            ) : (
              <p className="no-items-message">No items in order.</p>
            )}
          </div>
          <div className="order-summary-footer">
            <div className="summary-row">
              <span>Subtotal (selected items):</span>
              <span>
                {currency}
                {checkedBill.toFixed(2)}
              </span>
            </div>
            <div className="summary-row">
              <span>Shipping fees:</span>
              <span>
                {currency}
                {shippingFees.toFixed(2)}
              </span>
            </div>
            <div className="summary-row summary-total">
              <span>Total:</span>
              <span>
                {currency}
                {finalTotalBill.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">
            <svg
              className="text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h.01M17 11h.01M9 15h.01M15 15h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            Shipping Method
          </h2>
          <div className="form-field">
            <label htmlFor="shippingMethod" className="form-label">
              Selected Method
            </label>
            <input
              type="text"
              id="shippingMethod"
              name="shippingMethod"
              value={shippingInfo.shippingMethod}
              readOnly
              className="form-input"
            />
          </div>
          <p className="shipping-method-text">
            Estimated Delivery: 3-5 business days
          </p>
        </div>

        <div className="confirm-button-container">
          <button type="submit" className="confirm-button" disabled={loading}>
            {loading ? "Processing..." : "Confirm Order"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingDetails;
