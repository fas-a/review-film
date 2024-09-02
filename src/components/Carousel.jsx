import React, { useState } from 'react';
import './carousel.css'; // Pastikan Anda mengimpor CSS yang sesuai

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    "https://upload.wikimedia.org/wikipedia/commons/9/9e/Timisoara_-_Regional_Business_Centre.jpg",
    "https://content.r9cdn.net/rimg/dimg/db/02/06b291e8-city-14912-171317ad83a.jpg?width=1750&height=1000&xhint=3040&yhint=2553&crop=true",
    "https://speakzeasy.files.wordpress.com/2015/05/twa_blogpic_timisoara-4415.jpg"
  ];

  const prevSlide = () => {
    setActiveIndex(activeIndex === 0 ? slides.length - 1 : activeIndex - 1);
  };

  const nextSlide = () => {
    setActiveIndex(activeIndex === slides.length - 1 ? 0 : activeIndex + 1);
  };

  return (
    <div className="w-full px-4 md:px-20 xl:px-40 grid mt-4">
      <div className="carousel">
        <ul className="slides">
          {slides.map((slide, index) => (
            <li
              className={`slide-container ${index === activeIndex ? "active" : ""}`}
              key={index}
            >
              <div className="slide-image">
                <img src={slide} alt={`Slide ${index + 1}`} />
              </div>
              <div className="carousel-controls">
                <button className="prev-slide" onClick={prevSlide}>
                  <span>&lsaquo;</span>
                </button>
                <button className="next-slide" onClick={nextSlide}>
                  <span>&rsaquo;</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="carousel-dots">
          {slides.map((_, index) => (
            <label
              key={index}
              className={`carousel-dot ${index === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            ></label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
