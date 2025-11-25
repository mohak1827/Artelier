import React, { useState, useEffect } from 'react';
import HeroSlide from './HeroSlide';
import CarouselIndicators from '../../CarouselIndicators';
import './HeroCarousel.css';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Experience Live Auctions",
      description: "Join real-time bidding sessions with countdown timers and compete with collectors worldwide.",
      buttonText: "Join Live Auction",
      buttonLink: "#auctions",
      image: "https://c1india.com/wp-content/uploads/2020/05/Bidding-process.jpg"
    },
    {
      title: "Discover Amazing Artworks",
      description: "Browse our curated gallery featuring talented artists from around the globe.",
      buttonText: "Explore Gallery",
      buttonLink: "#gallery",
      image: "https://m.media-amazon.com/images/I/81gi8NfPpIL.jpg"
    },
    {
      title: "Sell Your Creative Works",
      description: "Transform your artistic passion into profit. List your artworks and reach collectors globally.",
      buttonText: "Start Selling",
      buttonLink: "#selling",
      image: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230314111615/Personal-Selling.png"
    },
    {
      title: "Safe & Secure Transactions",
      description: "Buy and sell with confidence using our encrypted payment system and buyer protection.",
      buttonText: "Learn More",
      buttonLink: "#payments",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleIndicatorClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="hero-expanded">
      <div className="hero-carousel">
        {slides.map((slide, index) => (
          <HeroSlide
            key={index}
            slide={slide}
            isActive={currentSlide === index}
          />
        ))}
      </div>

      <CarouselIndicators
        totalSlides={slides.length}
        currentSlide={currentSlide}
        onIndicatorClick={handleIndicatorClick}
      />
    </div>
  );
};

export default HeroCarousel;