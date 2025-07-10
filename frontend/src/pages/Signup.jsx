import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Signup.css";
import { backendUrl } from "../App.jsx";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null); // Clear notification
      }, 5000); // Notification disappears after 5 seconds
      return () => clearTimeout(timer); // Cleanup timer if component unmounts or notification changes
    }
  }, [notification]);

  // Function to manually dismiss the notification
  const dismissNotification = () => {
    setNotification(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setNotification(null); // Clear any previous notification
    setLoading(true); // Set loading to true while the request is in progress

    // Client-side validation: Check if first name or last name are empty
    if (!firstName.trim() || !lastName.trim()) {
      setNotification({ type: 'error', message: "First Name and Last Name are required." });
      setLoading(false);
      return; 
    }

    try {
      const response = await axios.post(backendUrl + "/api/user/register", {
        fname: firstName,
        lname: lastName,
        email,
        password,
      });

      if (response.status === 201) {
        setNotification({ type: 'success', message: "Signup successful! Redirecting to login..." });
        setTimeout(() => {
          window.location.href = "/login"; 
        }, 1500); 
      } else {
        // Handle cases where the status is not 201 but not an error either (e.g., 200 OK with custom message)
        setNotification({ type: 'error', message: response.data?.message || "Signup failed with an unexpected status." });
      }
    } catch (error) {
      if (error.response) {
        setNotification({ type: 'error', message: error.response.data?.message || "An error occurred during signup." });
        console.error("Signup error response:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received (e.g., network error)
        setNotification({ type: 'error', message: "No response from server. Please check your internet connection." });
        console.error("Signup error request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        setNotification({ type: 'error', message: "An unexpected error occurred. Please try again later." });
        console.error("Signup error message:", error.message);
      }
    } finally {
      setLoading(false); // Always set loading to false after the request completes
    }
  };

  return (
    <>
      <form className="signupform" onSubmit={handleSubmit}>
        <span id="register-lable">Register</span>
        <input
          className="input"
          type="text"
          placeholder="FirstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          className="input"
          type="text"
          placeholder="LastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          className="input"
          type="email" // Use type="email" for better validation
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="password" // Use type="password" for security
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button id="btn" type="submit">Register</button>
        <p className="login">
          Already have an account ? <a href="/login">Login</a>
        </p>

        {/* Notification Display Area - Moved inside the form */}
        {notification && (
          <ul className="notification-container" role="alert" aria-live="assertive" aria-atomic="true" id="signup-notification">
            <li className={`notification-item ${notification.type}`}>
              <div className="notification-content">
                <div className="notification-icon" aria-hidden="true">
                  {notification.type === 'error' ? (
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <circle cx="12" cy="16" r="1" />
                    </svg>
                  ) : (
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  )}
                </div>
                <div className="notification-text">{notification.message}</div>
                <button onClick={dismissNotification} className="notification-icon notification-close" aria-label="Dismiss notification" type="button">
                  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              {notification.type === 'error' && <div className="notification-progress-bar" />}
            </li>
          </ul>
        )}
      </form>
    </>
  );
}

export default Signup;
