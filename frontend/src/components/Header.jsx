import React from "react";
import "./Header.css";

function Header() {
  return (
    <>
      <div>
        <h2 className="shippingtitle">
          Free shipping for order over <span className="amt">Rs1999</span>
        </h2>
      </div>
    </>
  );
}

export default Header;
