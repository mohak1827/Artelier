import React from 'react';
import './AuctionHeader.css';

const AuctionHeader = () => {
  return (
    <div className="auction-header">
      <h1 className="auction-header-title">Welcome to the Artelier Auction</h1>
      <p className="auction-header-description">
        Discover and bid on exclusive pieces from the world's most talented emerging 
        and established artists. The current collection is now live.
      </p>
    </div>
  );
};

export default AuctionHeader;