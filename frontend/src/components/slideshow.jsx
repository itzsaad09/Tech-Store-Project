import React, { useState, useEffect } from "react";
import "./slideshow.css";
import img1 from "/src/assets/cyber-monday-celebration.jpg";
import img2 from "/src/assets/black_friday_facebook_banner_22.png";
import img3 from "/src/assets/WEB BANNER 41.png";
import img4 from "/src/assets/Electronics store.png";
import img5 from "/src/assets/133771699_10279844.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faCircle,
  faCircleDot,
} from "@fortawesome/free-solid-svg-icons";

function Slideshow() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const slides = [
    { img: img1, className: "mondaysale" },
    { img: img2, className: "fridaydiscount" },
    { img: img3, className: "cybermonday" },
    { img: img4, className: "electronicstore" },
    { img: img5, className: "diveintotech" },
  ];

  useEffect(() => {
    let slideTimeout;

    if (!isHovered) {
      slideTimeout = setTimeout(() => {
        setSlideIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    }

    return () => {
      clearTimeout(slideTimeout);
    };
  }, [slideIndex, isHovered, slides.length]);

  const goToSlide = (index) => {
    setSlideIndex(index);
  };

  const nextSlide = () => {
    setSlideIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className="slideshow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className="slide"
          style={{ display: index === slideIndex ? "block" : "none" }}
        >
          <img className={slide.className} src={slide.img} alt="" />
        </div>
      ))}

      <button className="prev" onClick={prevSlide}>
        <FontAwesomeIcon icon={faArrowLeft} size="xl" />
      </button>
      <button className="next" onClick={nextSlide}>
        <FontAwesomeIcon icon={faArrowRight} size="xl" />
      </button>

      <div className="dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === slideIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          >
            <FontAwesomeIcon 
              icon={index === slideIndex ? faCircleDot : faCircle} 
              size="xs" 
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default Slideshow;