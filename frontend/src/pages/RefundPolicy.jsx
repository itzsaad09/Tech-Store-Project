import React from "react";
import "./RefundPolicy.css";

function RefundPolicy() {
  return (
    <>
      <div className="refundpolicy">
        <h2>Refund Policy</h2>
        <p>
          We want you to love your purchase. If you’re not satisfied, our 30-day
          refund policy ensures a smooth return process.
        </p>

        <h4>Q. Eligibility for Returns</h4>
        <p>
          {" "}
          <b>Answer. </b>
          <li>
            ✅ <b>Unused, unopened</b> items in original packaging
          </li>
          <li>
            ✅ <b>Defective/damaged</b> items (contact us immediately)
          </li>
          <li>
            ❌ <b>Final sale, personalized, or digital products</b>{" "}
            (non-refundable)
          </li>
        </p>
        <h4>Q. How to Return an Item?</h4>
        <p>
          <b>Answer. </b>
          <li>
            <b>Log in</b> to your account.
          </li>
          <li>
            Go to <b>Order History</b> and select <b>Return Item</b>.
          </li>
          <li>
            Print the <b>prepaid return label</b> (if applicable).
          </li>
          <li>
            Ship the item back within <b>7 days</b> of approval.
          </li>
        </p>
        <h4>Q. Refund Process</h4>
        <p>
          <b>Answer. </b>
          <li>
            Refunds are issued to the original <b>payment method</b>.
          </li>
          <li>
            Processing time: <b>3-5 business days</b> after we receive the
            return.
          </li>
        </p>
      </div>
    </>
  );
}

export default RefundPolicy;
