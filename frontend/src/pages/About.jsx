import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <header className="about-header">
        <p className="tagline">Tech Made Easy. Shop with Confidence. 🚀</p>
      </header>

      <section className="about-intro">
        <h2>Our Story & Mission</h2>
        <p>
          At CyberCart, we believe in empowering your digital lifestyle with the
          finest tech accessories from around the globe. Our journey began with
          a passion for cutting-edge technology and a commitment to making
          premium gadgets accessible to everyone. We meticulously curate a
          selection of products that not only meet the highest standards of
          quality but also seamlessly integrate into and elevate your daily
          life.
        </p>
        <p>
          Our mission is simple: to be your trusted source for genuine,
          high-quality tech accessories, delivered with exceptional service. We
          strive to bring you the latest innovations, ensuring you're always
          ahead in the fast-evolving world of technology.
        </p>
      </section>

      <section className="about-offerings">
        <h2>What We Offer</h2>
        <p>
          CyberCart brings you premium global brands offering the latest tech
          accessories designed to elevate your lifestyle. From cutting-edge True
          Wireless Earbuds and sleek phone cases to powerful Bluetooth speakers
          and immersive gaming headsets, we curate only the best gadgets to
          complement your daily life.
        </p>
        <div className="product-categories">
          <ul>
            <li>
              🎧 True Wireless Earbuds: Experience unparalleled audio freedom.
            </li>
            <li>📱 Sleek Phone Cases: Protect your device in style.</li>
            <li>
              🔊 Powerful Bluetooth Speakers: Fill your world with vibrant
              sound.
            </li>
            <li>
              🎮 Immersive Gaming Headsets: Dive deep into your gaming
              adventures.
            </li>
            <li>
              🔌 Chargers & Cables: Stay powered up with reliable accessories.
            </li>
            <li>💻 Laptop Accessories: Enhance your productivity on the go.</li>
            <li>
              💡 Smart Home Devices: Transform your living space with
              intelligent tech.
            </li>
          </ul>
        </div>
      </section>

      <section className="about-commitment">
        <h2>Our Commitment to Quality & Authenticity</h2>
        <p>
          We understand the importance of genuine products and reliable
          performance. That's why, as authorized distributors for most of our
          brands, we guarantee 100% genuine products backed by official
          manufacturer warranties (except for select Chinese products). Your
          peace of mind is paramount to us, and we stand by the authenticity and
          quality of every item we sell.
        </p>
      </section>

      <section className="about-delivery">
        <h2>Convenient Shopping & Delivery</h2>
        <p>
          We believe that getting your hands on the latest tech should be as
          easy as possible. Enjoy free nationwide delivery on all orders above
          Rs. 1,999, ensuring your favorite gadgets reach your doorstep without
          extra cost. For added convenience, we offer 72-hour Cash on Delivery
          service where available, providing a secure and flexible payment
          option.
        </p>
      </section>

      <section className="about-cta">
        <h2>Join the CyberCart Family!</h2>
        <p>
          Explore our extensive collection and discover the perfect tech
          companions for your journey. At CyberCart, you're not just buying a
          product; you're investing in an elevated digital experience.
        </p>
        <p>
          Thank you for choosing CyberCart – where innovation meets reliability.
        </p>
        <button
          className="shop-now-button"
          onClick={() => (window.location.href = "/")}
        >
          Shop Now
        </button>
      </section>
    </div>
  );
}

export default About;
