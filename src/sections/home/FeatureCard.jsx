import React from 'react';
import './FeatureCard.css';

const FeatureCard = ({ feature }) => {

  const handleClick = (e) => {
    e.preventDefault();
    console.log('Navigate to:', feature.link);
  };

  return (
    <a 
      href={feature.link || '#'} 
      className="feature-card"
      onClick={handleClick}
    >
      <h3>{feature.icon} {feature.title}</h3>
      <p>{feature.description}</p>
    </a>
  );
};

export default FeatureCard;