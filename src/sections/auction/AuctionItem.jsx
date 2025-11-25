import React from 'react';
import { Link } from 'react-router-dom';
import './AuctionItem.css';

const AuctionItem = ({ item }) => {
  return (
    <div className="auction-item-card">
      <div className="auction-item-image-wrapper">
        <img src={item.image} alt={item.title} className="auction-item-image" />
      </div>
      <div className="auction-item-info">
        <h3 className="auction-item-title">{item.title}</h3>
        <p className="auction-item-artist">{item.artist}</p>
        <p className="auction-item-description">{item.description}</p>
        <div className="auction-item-bid-info">

          <div className="bid-section">
            <span className="bid-label">Current Bid</span>
            <span className="bid-value">{item.currentBid}</span>
          </div>
          <div className="time-section">
            <span className="time-remaining">{item.endTime}</span>
          </div>
        </div>

        {item.id === 101 ? (
          <Link to="/auction/golden-radiance" className="bid-button">
            Place Bid
          </Link>
        ) : (
          <button className="bid-button">Place Bid</button>
        )}

      </div>
    </div>
  );
};

export default AuctionItem;