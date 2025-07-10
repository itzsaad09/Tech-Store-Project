import React from 'react';
import './TrackOrder.css';

const Card = () => {
  return (
      <div className="stepper-box">
        {/* Order Placed */}
        <div className="stepper-step stepper-completed">
          <div className="stepper-circle">
            <svg viewBox="0 0 16 16" className="bi bi-check-lg" fill="currentColor" height={16} width={16} xmlns="http://www.w3.org/2000/svg">
              <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
            </svg>
          </div>
          <div className="stepper-line" />
          <div className="stepper-content">
            <div className="stepper-title">Order Placed</div>
            <div className="stepper-status">Completed</div>
            <div className="stepper-time">May 28, 10:24 AM</div>
          </div>
        </div>

        {/* Order Confirmed */}
        <div className="stepper-step stepper-completed">
          <div className="stepper-circle">
            <svg viewBox="0 0 16 16" className="bi bi-check-lg" fill="currentColor" height={16} width={16} xmlns="http://www.w3.org/2000/svg">
              <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
            </svg>
          </div>
          <div className="stepper-line" />
          <div className="stepper-content">
            <div className="stepper-title">Order Confirmed</div>
            <div className="stepper-status">Completed</div>
            <div className="stepper-time">May 28, 11:00 AM</div>
          </div>
        </div>

        {/* Order Packed */}
        <div className="stepper-step stepper-active">
          <div className="stepper-circle">3</div> {/* You can change this to a checkmark if this step is completed */}
          <div className="stepper-line" />
          <div className="stepper-content">
            <div className="stepper-title">Order Packed</div>
            <div className="stepper-status">In Progress</div>
            <div className="stepper-time">May 29, 09:00 AM</div>
          </div>
        </div>

        {/* Ready To Ship */}
        <div className="stepper-step stepper-pending">
          <div className="stepper-circle">4</div>
          <div className="stepper-line" />
          <div className="stepper-content">
            <div className="stepper-title">Ready To Ship</div>
            <div className="stepper-status">Pending</div>
            <div className="stepper-time">Estimated: May 29, 02:00 PM</div>
          </div>
        </div>

        {/* Shipped */}
        <div className="stepper-step stepper-pending">
          <div className="stepper-circle">5</div>
          <div className="stepper-line" />
          <div className="stepper-content">
            <div className="stepper-title">Shipped</div>
            <div className="stepper-status">Pending</div>
            <div className="stepper-time">Estimated: May 30</div>
          </div>
        </div>

        {/* Attempt to Deliver Today */}
        <div className="stepper-step stepper-pending">
          <div className="stepper-circle">6</div>
          <div className="stepper-line" />
          <div className="stepper-content">
            <div className="stepper-title">Attempt to Deliver Today</div>
            <div className="stepper-status">Pending</div>
            <div className="stepper-time">Estimated: May 31</div>
          </div>
        </div>

        {/* Delivered */}
        <div className="stepper-step stepper-pending">
          <div className="stepper-circle">7</div>
          <div className="stepper-content">
            <div className="stepper-title">Delivered</div>
            <div className="stepper-status">Pending</div>
            <div className="stepper-time">Estimated: May 31</div>
          </div>
        </div>
      </div>
  );
}

export default Card;