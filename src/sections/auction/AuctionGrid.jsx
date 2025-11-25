import React from 'react';
import AuctionItem from './AuctionItem';
import './AuctionGrid.css';

const AuctionGrid = ({ auctionItems }) => {
  return (
    <div className="auction-grid-container">
      <div className="auction-grid">
        {auctionItems.map((item) => (
          <AuctionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AuctionGrid;