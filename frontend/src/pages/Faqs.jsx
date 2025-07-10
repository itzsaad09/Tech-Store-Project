import React from "react";
import "./Faqs.css"

function Faqs() {
  return (
    <>
    <div className="faq">
      <h2>Frequently Asked Questions</h2>
      <p>
        Welcome to the <b>CyberCart Store FAQ</b> page! Here, we’ve compiled
        answers to the most common questions about shopping with us, including
        order processing, shipping, returns, payments, and more. If you don’t
        find the information you need, our <b>24/7 customer support team</b> is
        always ready to assist you.
      </p>

      <h3>General Questions</h3>
      <h4>Q. What is CyberCart?</h4>
      <p>
        <b>Answer. </b>CyberCart is an online retail store specializing in electronics. We
        offer a seamless shopping experience with fast shipping, secure
        payments, and excellent customer service.
      </p>
      <h4>Q. How do I create an account?</h4>
      <p>
        <b>Answer. </b>Creating an account is simple:
        <li>
          Click <b>Sign Up</b> at the top right of our website.
        </li>
        <li>
          Enter your <b>name, email, and password</b>.
        </li>
        <li>Verify your email, and you’re ready to shop!</li>
      </p>
      <h4>Q. How do I reset my password?</h4>
      <p>
        <b>Answer. </b>Creating an account is simple:
        <li>
          Click <b>Forgot Password?</b> on the login page.
        </li>
        <li>
          Enter your <b>registered email</b>.
        </li>
        <li>
          Follow the <b>reset link</b> sent to your inbox.
        </li>
        <li>
          Create a <b>new password</b>.
        </li>
      </p>

      <h3>Ordering & Payments</h3>
      <h4>Q. How do I place an order?</h4>
      <p>
        <b>Answer. </b>
        <li>Browse our store and add items to your cart.</li>
        <li>Proceed to checkout.</li>
        <li>Enter shipping details and payment information.</li>
        <li>Confirm your order—you’ll receive an order confirmation email.</li>
      </p>
      <h4>Q. What payment methods do you accept?</h4>
      <p>
        <b>Answer. </b>We accept:
        <li>Credit/Debit Cards (Visa, Mastercard).</li>
        <li>Cash on Delivery (COD).</li>
      </p>
      <h4>Q. Can I cancel my order?</h4>
      <p>
        A. You can modify/cancel your order within 1 hour of placing it. After
        that, contact support immediately—we’ll try our best to assist.
      </p>

      <h3>Shipping & Delivery</h3>
      <h4>Q. How long does shipping take?</h4>
      <p>
        <b>Answer. </b><b>Standard Shipping:</b> 3-5 business days
      </p>
      <h4>Q. Do you offer free shipping?</h4>
      <p>
        <b>Answer. </b>Yes! Orders over <b>Rs. 1999</b> qualify for{" "}
        <b>free standard shipping</b>.
      </p>

      <h3>Returns & Refunds</h3>
      <h4>Q. What is your return policy?</h4>
      <p>
        <b>Answer. </b>
        <li>
          Items must be <b>unused, in original packaging</b>.
        </li>
        <li>
          Returns accepted within <b>7 days</b> of delivery.
        </li>
      </p>
      <h4>Q. How do I initiate a return?</h4>
      <p>
        <b>Answer. </b>
        <li>Login to your account.</li>
        <li>
          Click <b>My Orders</b> on the homepage.
        </li>
        <li>
          Click <b>Return Item</b> for the order you want to return.
        </li>
        <li>
          Follow the <b>return instructions</b> provided.
        </li>
      </p>
      <h4>Q. How long do refunds take?</h4>
      <p>
        <b>Answer. </b>Once we receive your return, refunds are processed in{" "}
        <b>3-5 business days</b>. The refund will reflect in your original
        payment method.
      </p>
    </div>
    </>
  );
}

export default Faqs;
