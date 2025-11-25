import React from 'react';
import './HeroSlide.css';

const HeroSlide = ({ slide, isActive }) => {
  return (
    <div className={`hero-slide ${isActive ? 'active' : ''}`}>
      <div className="hero-slide-content">
        <div className="hero-text">
          <h2>{slide.title}</h2>
          <p>{slide.description}</p>
          <a 
            href={slide.buttonLink} 
            className="cta-btn"
            onClick={(e) => {
              e.preventDefault();
              console.log('Navigate to:', slide.buttonLink);
            }}
          >
            {slide.buttonText}
          </a>
        </div>
        <div className="hero-img-box">
          <img 
            src={slide.image} 
            alt={slide.title} 
            className="hero-img" 
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSlide;