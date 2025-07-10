import React, { useState } from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faPlus,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import {
  faSquareInstagram,
  faSquareFacebook,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="footer">
      <div className="footer-container">
        <div className={`col ${activeSection === 'about' ? 'active' : ''}`}>
          <h3 className="desktop-only">About Us</h3>
          <div className="section-header" onClick={() => toggleSection('about')}>
            <h3>About Us</h3>
            <FontAwesomeIcon 
              className="toggle-icon" 
              icon={activeSection === 'about' ? faTimes : faPlus} 
            />
          </div>
          <div className="section-content">
            <p className="about-us">
              CyberCart brings you <b>premium global brands</b> offering the
              latest tech accessories designed to elevate your lifestyle. From
              cutting-edge <b>True Wireless Earbuds</b> and{" "}
              <b>sleek phone cases</b> to powerful <b>Bluetooth speakers</b>,
              and immersive <b>gaming headsets</b>, we curate only the best
              gadgets to complement your daily life. <br /> As{" "}
              <b>authorized distributors</b> for most of our brands, we
              guarantee <b>100% genuine products</b> backed by official
              manufacturer warranties (except for select Chinese products).
              Enjoy free nationwide delivery on all orders above{" "}
              <b>Rs. 1,999</b>, along with <b>72-hour Cash on Delivery</b>{" "}
              service where available. <br />{" "}
              <b>Tech Made Easy. Shop with Confidence. 🚀</b>
            </p>
          </div>
        </div>

        <div className={`col ${activeSection === 'contact' ? 'active' : ''}`}>
          <h3 className="desktop-only">Contact</h3>
          <div className="section-header" onClick={() => toggleSection('contact')}>
            <h3>Contact</h3>
            <FontAwesomeIcon 
              className="toggle-icon" 
              icon={activeSection === 'contact' ? faTimes : faPlus} 
            />
          </div>
          <div className="section-content">
            <p className="contact">
              <b><FontAwesomeIcon className="phoneicon" icon={faPhone} /></b>
              <a href="tel:+923001234567">+92 300 1234567</a> <br />
              <b><FontAwesomeIcon className="mailicon" icon={faEnvelope} /></b>
              <a href="mailto:support@cybercart.com">support@cybercart.com</a>
            </p>
          </div>
        </div>

        <div className={`col ${activeSection === 'links' ? 'active' : ''}`}>
          <h3 className="desktop-only">Quick Links</h3>
          <div className="section-header" onClick={() => toggleSection('links')}>
            <h3>Quick Links</h3>
            <FontAwesomeIcon 
              className="toggle-icon" 
              icon={activeSection === 'links' ? faTimes : faPlus} 
            />
          </div>
          <div className="section-content">
            <p className="quicklinks">
              <a href="/faqs">FAQs</a> <br />
              <a href="/trackorder">Track Order</a> <br />
              <a href="/privacypolicy">Privacy Policy</a> <br />
              <a href="/refundpolicy">Refund Policy</a> <br />
              <a href="/termsofservices">Terms of Services</a> <br />
            </p>
          </div>
        </div>
      </div>
      
      <hr />
      <div className="copyright">
        <p>&copy; 2025 CyberCart.</p>
        <div className="social-media">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon className="facebookicon" icon={faSquareFacebook} />
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon className="instagramicon" icon={faSquareInstagram} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;