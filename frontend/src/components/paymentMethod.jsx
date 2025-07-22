import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { currency, backendUrl } from '../App';
import './paymentMethod.css';
import axios from 'axios';

const PaymentMethod = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract data passed from shippingDetails.jsx
  const { cartData, shippingInfo } = location.state || {};
  const token = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");

  // Debugging logs for PaymentMethod page
  useEffect(() => {
    if (!cartData || !shippingInfo) {
      console.warn("Missing cartData or shippingInfo in PaymentMethod. Redirecting to cart.");
      // Optionally redirect if essential data is missing (e.g., if user navigated directly)
      navigate('/cart'); // Uncomment if you want to redirect
    }
  }, [location.state, cartData, shippingInfo, navigate]);


  // Derive order summary details from cartData
  const cartItemsArray = cartData?.cart || [];
  const checkedBill = cartData?.checkedBill || 0;
  const shippingFees = cartData?.shippingFees || 0;
  const finalTotalBill = cartData?.finalTotalBill || (checkedBill + shippingFees);

  // State for payment method selection
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cash_on_delivery'); // Default to credit card
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  // Mark handlePlaceOrder as async
  const handlePlaceOrder = async (e) => { // ADD ASYNC HERE
    e.preventDefault(); // Prevent default form submission

    // Basic validation
    if (selectedPaymentMethod === 'credit_card') {
      if (!cardDetails.cardNumber || !cardDetails.cardName || !cardDetails.expiryDate || !cardDetails.cvv) {
        alert("Please fill in all card details.");
        return;
      }
    }

    console.log("Placing Order...");
    console.log("Selected Payment Method:", selectedPaymentMethod);
    if (selectedPaymentMethod === 'credit_card') {
      console.log("Card Details (Masked):", {
        cardNumber: `**** **** **** ${cardDetails.cardNumber.slice(-4)}`, // Mask card number
        cardName: cardDetails.cardName,
        expiryDate: cardDetails.expiryDate,
        cvv: '***', // Never log actual CVV
      });
    }
    console.log("Final Order Summary:", {
      items: cartItemsArray,
      subtotal: checkedBill,
      shipping: shippingFees,
      total: finalTotalBill,
      shippingAddress: shippingInfo, // Pass shipping info here
    });

    try {
        const response = await axios.post(`${backendUrl}/api/order/place`, {
            userId,
            cartItemsArray,
            checkedBill,
            shippingFees,
            finalTotalBill,
            shippingInfo, // Pass shipping info here
            paymentMethod: selectedPaymentMethod,
            cardDetails: selectedPaymentMethod === 'credit_card' ? cardDetails : {}, // Only send card details if credit card is selected
        }, {
            headers: {
                token: token,
            },
        });

        console.log("Order placement response:", response);
        alert("Order Placed Successfully!");
        localStorage.removeItem("cartData");
        // Navigate to order confirmation page after successful order placement
        window.location.href = '/myorders';
    } catch (error) {
        console.error("Error placing order:", error.response ? error.response.data : error.message);
        alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="payment-method-container">
      <form onSubmit={handlePlaceOrder} className="payment-form">
        <h1 className="payment-title">Payment Method</h1>

        {/* Order Summary Section */}
        <div className="order-summary-section">
          <h2 className="section-title">Order Summary</h2>
          <div className="order-items">
            {cartItemsArray.length > 0 ? (
              cartItemsArray.map((item) => (
                <div key={`${item.productId}_${item.color || item.id}`} className="order-item-detail">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>{currency}{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))
            ) : (
              <p>No items in order summary.</p>
            )}
          </div>
          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>{currency}{checkedBill.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping:</span>
              <span>{currency}{shippingFees.toFixed(2)}</span>
            </div>
            <div className="total-row final-total">
              <span>Total:</span>
              <span>{currency}{finalTotalBill.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Address Display (Optional - for user confirmation) */}
        {shippingInfo && (
          <div className="shipping-address-display">
            <h2 className="section-title">Shipping Address</h2>
            <p>{shippingInfo.fullName}</p>
            <p>{shippingInfo.addressLine1}</p>
            {shippingInfo.addressLine2 && <p>{shippingInfo.addressLine2}</p>}
            <p>{shippingInfo.city}, {shippingInfo.stateProvince} {shippingInfo.postalCode}</p>
            <p>{shippingInfo.country}</p>
            <p>Phone: {shippingInfo.phoneNumber}</p>
          </div>
        )}


        {/* Payment Method Selection */}
        <div className="payment-selection-section">
          <h2 className="section-title">Select Payment Method</h2>
          <div className="payment-options">
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="credit_card"
                checked={selectedPaymentMethod === 'credit_card'}
                onChange={handlePaymentMethodChange}
              />
              Credit/Debit Card
            </label>
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="cash_on_delivery"
                checked={selectedPaymentMethod === 'cash_on_delivery'}
                onChange={handlePaymentMethodChange}
              />
              Cash on Delivery (COD)
            </label>
            {/* Add more payment options here (e.g., PayPal, Bank Transfer) */}
          </div>
        </div>

        {/* Credit Card Details Form (conditionally rendered) */}
        {selectedPaymentMethod === 'credit_card' && (
          <div className="card-details-section">
            <h2 className="section-title">Card Details</h2>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleCardDetailsChange}
                placeholder="XXXX XXXX XXXX XXXX"
                required
                pattern="[0-9]{13,19}" // Basic pattern for card numbers (13-19 digits)
                title="Credit card number must be 13 to 19 digits"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cardName">Cardholder Name</label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={cardDetails.cardName}
                onChange={handleCardDetailsChange}
                placeholder="Name on Card"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={handleCardDetailsChange}
                  placeholder="MM/YY"
                  required
                  pattern="(0[1-9]|1[0-2])\/([0-9]{2})" // MM/YY format
                  title="Expiry date must be in MM/YY format (e.g., 12/25)"
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardDetailsChange}
                  placeholder="XXX"
                  required
                  pattern="[0-9]{3}"
                  title="CVV must be 3 digits"
                />
              </div>
            </div>
          </div>
        )}

        {/* Place Order Button at the end */}
        <button type="submit" className="place-order-button">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default PaymentMethod;