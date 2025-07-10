import React from "react";
import "./Home.css";
import Slideshow from "../components/slideshow.jsx";
import Viral from "../components/viralproducts.jsx";
import NewArrivals from "../components/newarrivals.jsx";

function Home() {
  return (
    <>
      <Slideshow />
      <Viral />
      <NewArrivals />
    </>
  );
}

export default Home;
