import React from 'react';
import './CarouselIndicators.css';

const CarouselIndicators = ({ totalSlides, currentSlide, onIndicatorClick }) => {
  return (
    <div className="carousel-indicators">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <span
          key={index}
          className={`indicator ${currentSlide === index ? 'active' : ''}`}
          onClick={() => onIndicatorClick(index)}
          aria-label={`Go to slide ${index + 1}`}
        ></span>
      ))}
    </div>
  );
};

export default CarouselIndicators;