import React from "react";
import logo from "/src/assets/logo1.png";
import "./sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faList,
  faCartShopping,
  faUsers,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

function sidebar({ setToken }) {
  return (
    <>
      <div className="sidebar">
        <div className="item logo-container">
          <img
            className="logo"
            onClick={() => (window.location.href = "/")}
            src={logo}
            alt="Company Logo"
          />
        </div>

        <h2>Admin Dashboard</h2>

        <div className="add-product">
          <button
            className="add-product-button"
            onClick={() => (window.location.href = "/")}
          >
            Add Product
            <FontAwesomeIcon icon={faPlus} className="add-icon" />
          </button>
        </div>

        <div className="list-item">
          <button
            className="list-item-button"
            onClick={() => (window.location.href = "/view")}
          >
            View Products
            <FontAwesomeIcon icon={faList} className="list-icon" />
          </button>
        </div>

        <div className="orders">
          <button
            className="orders-button"
            onClick={() => (window.location.href = "/orders")}
          >
            Orders
            <FontAwesomeIcon icon={faCartShopping} className="orders-icon" />
          </button>
        </div>

        <div className="users">
          <button
            className="users-button"
            onClick={() => (window.location.href = "/users")}
          >
            Show Users
            <FontAwesomeIcon icon={faUsers} className="users-icon" />
          </button>
        </div>

        <div className="logout">
          <button
            className="logout-button"
            onClick={() => ((window.location.href = "/"), setToken(""))}
          >
            Logout
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="logout-icon"
            />
          </button>
        </div>

        <div className="vertical-line"></div>
      </div>
    </>
  );
}

export default sidebar;
