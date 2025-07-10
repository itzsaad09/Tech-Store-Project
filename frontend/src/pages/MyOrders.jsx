import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MyOrders.css";
import { backendUrl, currency } from "../App";

const MyOrdersList = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/order/userorders/${userId}`,
          {
            headers: { token },
          }
        );
        if (response.data.success) {
          setMyOrders(response.data.orders);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error("Error fetching user orders:", err);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  if (loading) {
    return <div className="my-orders-container">Loading orders...</div>;
  }

  if (error) {
    return <div className="my-orders-container error-message">{error}</div>;
  }

  return (
    <div className="my-orders-container">
      <h2>My Orders</h2>
      {myOrders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="orders-table-wrapper">
          <div className="orders-table-header">
            <div className="header-item product-header">Items</div>{" "}
            <div className="header-item">Order ID</div>
            <div className="header-item">Amount</div>
            <div className="header-item">Status</div>
            {/* <div className="header-item">Order Date</div> */}
            {/* <div className="header-item actions-header">Actions</div> */}
          </div>
          {myOrders.map((order) => (
            <div className="order-row" key={order._id}>
              {" "}
              <div className="row-item product-details">
                {order.items.map(
                  (
                    item,
                    index // Iterate through items in the order
                  ) => (
                    <div key={index} className="order-item-detail">
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="row-product-image"
                      />
                      <span className="row-product-name">
                        {item.name} x {item.quantity}
                      </span>
                    </div>
                  )
                )}
              </div>
              <div className="row-item">{order._id}</div>{" "}
              <div className="row-item">
                {currency}
                {order.amount.toFixed(2)}
              </div>{" "}
              <div
                className={`row-item order-status status-${order.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {order.status}
              </div>
              {/* <div className="row-item">
                {new Date(order.createdAt).toLocaleDateString()}
              </div> */}
              {/* <div className="row-item order-actions">
                <Link
                  to={`/trackorder/${order._id}`}
                  className="track-order-button-list"
                >
                  Track
                </Link>
              // </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrdersList;
