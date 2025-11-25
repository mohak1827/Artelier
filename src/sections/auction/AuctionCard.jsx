import React from 'react';
import './AuctionCard.css';

const AuctionCard = ({ auction }) => {

  const handleClick = () => {
    console.log('View auction details:', auction.id);
  };

  return (
    <div className="event-item" onClick={handleClick}>
      <img src={auction.image} alt={auction.title} />
      <div className="event-content">
        <div className="event-title">{auction.title}</div>
        <div className="event-date">{auction.date}</div>
        <div className="event-desc">{auction.description}</div>
      </div>
    </div>
  );
};

export default AuctionCard;