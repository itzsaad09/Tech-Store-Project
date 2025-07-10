import React, { useState } from "react";
import "./shippingDetails.css";
import { currency } from "../App";
import { useLocation, useNavigate } from "react-router-dom";

const ShippingDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const cartItemsArray = cartData?.cart || [];
  const checkedBill = cartData?.checkedBill || 0;
  const shippingFees = cartData?.shippingFees || 0;
  const finalTotalBill = cartData?.finalTotalBill || checkedBill + shippingFees;

  const handleConfirmOrder = () => {
    navigate("/payment", {
      state: {
        cartData: cartData,
        shippingInfo: shippingInfo,
      },
    });
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
        value={shippingInfo[id]}
        onChange={handleChange}
        placeholder={placeholder}
        className="form-input"
        required // Added required attribute for form validation
      />
    </div>
  );

  return (
    <div className="app-container">
      <form
        className="shipping-form-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleConfirmOrder();
        }}
      >
        <span className="form-main-label">Shipping Details</span>

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
            Delivery Address
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
            {renderEditableInputField("country", "Country", "text", "Pakistan")}
          </div>
        </div>

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
          <button type="submit" className="confirm-button">
            Confirm Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingDetails;
