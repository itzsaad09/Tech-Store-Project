import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import "./showUsers.css";
import { backendUrl } from "../App";

function ShowUsers({ setToken }) {
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const dismissNotification = () => {
    setNotification(null);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/user/display");

      if (response.status !== 200) {
        throw new Error("Failed to fetch users");
      } else {
        // Assuming response.data.users contains the array of user objects
        setUsers(response.data.users);
        showNotification("Users fetched successfully!", "success");
        console.log("Fetched users:", response.data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      showNotification("Failed to fetch users. Please try again.", "error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      <Sidebar setToken={setToken} />
      <div className="dashboard">
        <h1>View Users</h1>
      </div>
      <div className="user-list">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            {/* Assuming user objects have a 'name' and 'email' field. Adjust as per your user schema. */}
            <p>
              <b>User ID: </b> {user._id}
            </p>
            <p>
              <b>Email: </b>
              {user.email}
            </p>
            <p>
              <b>Shipping Details</b>
            </p>
            <p>
              <b>Name: </b>
              {user.shippingDetails.fullName}
            </p>
            <p>
              <b>Phone Number: </b>
              {user.shippingDetails.phoneNumber}
            </p>
            <p>
              {user.shippingDetails.addressLine1},{" "}
              {user.shippingDetails.addressLine2},{" "}
              {user.shippingDetails.country}, {user.shippingDetails.postalCode}
            </p>
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

export default ShowUsers;
