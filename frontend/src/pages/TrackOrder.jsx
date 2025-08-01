import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import './TrackOrder.css';

const TrackOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setError("No order ID provided.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        // FIX: Appended orderId to the API endpoint
        const response = await axios.get(`${backendUrl}/api/order/${orderId}`);
        if (response.data.success) {
          setOrder(response.data.order);
        } else {
          setError(response.data.message || "Failed to fetch order details.");
        }
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("Error fetching order details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]); // Re-fetch if orderId changes

  // Define the order statuses and their display order
  const orderSteps = [
    { name: "Order Placed", statusKey: "order placed" },
    { name: "Order Confirmed", statusKey: "order confirmed" },
    { name: "Order Packed", statusKey: "order packed" },
    { name: "Ready To Ship", statusKey: "ready to ship" },
    { name: "Shipped", statusKey: "shipped" },
    { name: "Out For Delivery", statusKey: "out for delivery" },
    { name: "Delivered", statusKey: "delivered" },
  ];

  // Function to determine the status of each step
  const getStepStatus = (currentOrderStatus, stepStatusKey) => {
    const currentOrderIndex = orderSteps.findIndex(step => step.statusKey === currentOrderStatus.toLowerCase());
    const stepIndex = orderSteps.findIndex(step => step.statusKey === stepStatusKey);

    if (stepIndex < currentOrderIndex) {
      return "completed"; // Step is before current status
    } else if (stepIndex === currentOrderIndex) {
      return "active"; // This is the current step
    } else {
      return "pending"; // Step is after current status
    }
  };

  if (loading) {
    return <div className="track-order-container">Loading order details...</div>;
  }

  if (error) {
    return <div className="track-order-container error-message">{error}</div>;
  }

  if (!order) {
    return <div className="track-order-container">Order not found.</div>;
  }

  // Format date and time
  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  return (
    <div className="track-order-container">
      <h1>Track Order #{order._id}</h1>

      <div className="order-details-summary">
        <div className="summary-item">
          <strong>Order Total:</strong> {currency}{order.amount.toFixed(2)}
        </div>
        <div className="summary-item">
          <strong>Current Status:</strong> <span className={`order-status status-${order.status.toLowerCase().replace(" ", "-")}`}>{order.status}</span>
        </div>
        <div className="summary-item">
          <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div className="stepper-box">
        {orderSteps.map((step, index) => {
          const status = getStepStatus(order.status, step.statusKey);
          const isCompleted = status === "completed";
          const isActive = status === "active";

          return (
            <div key={step.statusKey} className={`stepper-step stepper-${status}`}>
              <div className="stepper-circle">
                {isCompleted ? (
                  <svg viewBox="0 0 16 16" className="bi bi-check-lg" fill="currentColor" height={16} width={16} xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                  </svg>
                ) : (
                  index + 1 // Display number if not completed
                )}
              </div>
              {/* Don't render line after the last step */}
              {index < orderSteps.length - 1 && <div className="stepper-line" />}
              <div className="stepper-content">
                <div className="stepper-title">{step.name}</div>
                <div className="stepper-status">
                  {isCompleted && "Completed"}
                  {isActive && "In Progress"}
                  {!isCompleted && !isActive && "Pending"}
                </div>
                {/* Display actual order creation time for "Order Placed" */}
                {step.statusKey === "order placed" && order.createdAt && (
                  <div className="stepper-time">
                    {formatDateTime(order.createdAt)}
                  </div>
                )}
                {/* You can add logic here to display actual times for other steps if available in your order object */}
                {/* For now, just a placeholder or N/A */}
                {step.statusKey !== "order placed" && (
                  <div className="stepper-time">
                    {/* Replace with actual timestamps from order.statusHistory if available */}
                    {status === "pending" ? "Estimated: N/A" : "N/A"}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="order-items-section">
        <h3>Order Items</h3>
        <div className="order-items-list">
          {order.items && order.items.length > 0 ? (
            order.items.map((item, index) => (
              <div key={item._id || index} className="order-item-detail-track"> {/* Use item._id for key if available */}
                <img src={item.image[0]} alt={item.name} className="item-image-track" />
                <div className="item-info-track">
                  <span className="item-name-track">{item.name}</span>
                  <span className="item-quantity-price-track">
                    x{item.quantity} - {currency}{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No items found for this order.</p>
          )}
        </div>
      </div>

      <div className="shipping-address-section">
        <h3>Shipping Address</h3>
        {order.address ? (
          <div className="shipping-address-details">
            <p><strong>{order.address.fullName}</strong></p>
            <p>{order.address.addressLine1}</p>
            {order.address.addressLine2 && <p>{order.address.addressLine2}</p>}
            <p>{order.address.city}, {order.address.stateProvince} {order.address.postalCode}</p>
            <p>{order.address.country}</p>
            <p>Phone: {order.address.phoneNumber}</p>
          </div>
        ) : (
          <p>Shipping address not available.</p>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
