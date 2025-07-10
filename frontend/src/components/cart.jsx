import React, { useState, useEffect } from "react";
import "./cart.css";
import { useCart } from "../context/CartContext";
import { currency } from "../App";
import { Link } from "react-router-dom";

const Form = () => {
  const { cart, bill, loading, error, incrementQuantity, decrementQuantity } = useCart();
  const [checkedItems, setCheckedItems] = useState({});
  const cartItemsArray = Object.values(cart);
  const defaultShippingFee = 150;
  const freeShippingThreshold = 1999;

  const checkedBill = cartItemsArray.reduce((total, item) => {
    const itemKey = `${item.productId}_${item.color}`;
    if (checkedItems[itemKey]) {
      return total + item.price * item.quantity;
    }
    return total;
  }, 0);

  const shippingFees =
    Object.keys(checkedItems).length === 0 || checkedBill === 0
      ? 0
      : checkedBill >= freeShippingThreshold
      ? 0
      : defaultShippingFee;

  const finalTotalBill = checkedBill + shippingFees;

  useEffect(() => {
    const initialCheckedState = {};
    cartItemsArray.forEach((item) => {
      initialCheckedState[`${item.productId}_${item.color}`] = false;
    });
    setCheckedItems(initialCheckedState);
  }, [cart]);

  const handleCheckboxChange = (itemKey) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [itemKey]: !prevCheckedItems[itemKey],
    }));
  };

  const filteredCartItems = cartItemsArray.filter(item => checkedItems[`${item.productId}_${item.color}`]);
  const dataToSend = {
    cart: filteredCartItems,
    checkedBill: checkedBill,
    shippingFees: shippingFees,
    finalTotalBill: finalTotalBill,
  };

  return (
    <>
      <div className="master-container">
        <div className="card cart">
          <label className="title">Your Cart</label>
          <div className="products">
            {loading && <p>Loading cart...</p>}
            {error && (
              <p style={{ color: "red" }}>Error loading cart: {error}</p>
            )}
            {cartItemsArray.length === 0 && !loading && !error && (
              <p>Your cart is empty.</p>
            )}

            {cartItemsArray.length > 0 &&
              cartItemsArray.map((item) => {
                const itemKey = `${item.productId}_${item.color}`;
                return (
                  <div className="product" key={itemKey}>
                    <input
                      type="checkbox"
                      checked={checkedItems[itemKey] || false}
                      onChange={() => handleCheckboxChange(itemKey)}
                      className="product-checkbox"
                    />
                    {item.image && item.image.length > 0 && (
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="product-image"
                      />
                    )}
                    <div>
                      <span>{item.name}</span>
                      {item.color && <p>Color: {item.color}</p>}
                    </div>
                    <div className="quantity">
                      <button
                        onClick={() =>
                          decrementQuantity(item.productId, item.color)
                        }
                      >
                        -
                      </button>
                      <label>{item.quantity}</label>
                      <button
                        onClick={() =>
                          incrementQuantity(item.productId, item.color)
                        }
                      >
                        +
                      </button>
                    </div>
                    <label className="price small">
                      {currency}
                      {(item.price * item.quantity).toFixed(2)}
                    </label>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="card coupons">
          <label className="title">Apply coupons</label>
          <form className="form">
            <input
              type="text"
              placeholder="Apply your coupons here"
              className="input_field"
            />
            <button>Apply</button>
          </form>
        </div>
        <div className="card checkout">
          <label className="title">Checkout</label>
          <div className="details">
            <span>Your cart subtotal (selected items):</span>
            <span>
              {currency}
              {checkedBill.toFixed(2)}
            </span>
            <span>Discount through applied coupons:</span>
            <span>{currency}0.00</span>
            <span>Shipping fees:</span>
            <span>
              {shippingFees === 0
                ?  `${currency}0.00`
                : `${currency}${shippingFees.toFixed(2)}`}
            </span>
          </div>
          <div className="checkout--footer">
            <label className="price">
              <sup>{currency}</sup>
              {finalTotalBill.toFixed(2)}
            </label>
            <Link
              to="/shipping"
              onClick={() => {
                localStorage.setItem("cartData", JSON.stringify(dataToSend));
              }}
              className="checkout-btn"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
