import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { backendUrl } from "../App.jsx";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Destructure fetchCart from useCart
  const { fetchCart } = useCart();
  const { login } = useAuth();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const dismissError = () => {
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(backendUrl + "/api/user/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user = {} } = response.data;

        login(token);

        fetchCart();

        window.location.href = "/";
      } else {
        setError(
          response.data?.message || "Login failed with an unexpected status."
        );
      }
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data?.message ||
            "An error occurred during login. Please check credentials."
        );
        console.error("Login error response:", error.response.data);
      } else if (error.request) {
        setError(
          "No response from server. Please check your internet connection."
        );
        console.error("Login error request:", error.request);
      } else {
        setError("An unexpected error occurred. Please try again later.");
        console.error("Login error message:", error.message);
      }
    }
  };

  return (
    <>
      <form className="loginform" onSubmit={handleSubmit}>
        <span id="login-lable">Login</span>
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="forgot">Forgot Password</p>
        <button id="btn" type="submit">
          Login
        </button>
        <p className="signup">
          Don't have an account ? <a href="/signup">Signup</a>{" "}
        </p>
      </form>
      {error && (
        <ul
          className="notification-container"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          id="login-error"
        >
          <li className="notification-item error">
            <div className="notification-content">
              <div className="notification-icon" aria-hidden="true">
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
              </div>
              <div className="notification-text">{error}</div>
              <button
                onClick={dismissError}
                className="notification-icon notification-close"
                aria-label="Dismiss error notification"
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

export default Login;
