import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { liveAuctions, upcomingAuctions, recentAuctions, getTimeRemaining, getTimeUntilStart, formatDate } from './auctionsData';
import './AuctionPage.css';

const AuctionPage = () => {
  const [activeTab, setActiveTab] = useState('live');
  const [timers, setTimers] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = {};
      liveAuctions.forEach(auction => {
        newTimers[auction.id] = getTimeRemaining(auction.endTime);
      });
      setTimers(newTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTimer = (time) => {
    if (!time || time.total <= 0) return 'Ended';
    
    if (time.days > 0) {
      return `${time.days}d ${time.hours}h ${time.minutes}m`;
    } else if (time.hours > 0) {
      return `${time.hours}h ${time.minutes}m ${time.seconds}s`;
    } else {
      return `${time.minutes}m ${time.seconds}s`;
    }
  };

  return (
    <div className="auction-page">
      <div className="auction-hero">
        <h1>Art Auctions</h1>
        <p>Bid on exclusive artworks from renowned artists worldwide</p>
      </div>

      <div className="auction-tabs">
        <button 
          className={`auction-tab ${activeTab === 'live' ? 'active' : ''}`}
          onClick={() => setActiveTab('live')}
        >
          Live Auctions ({liveAuctions.length})
        </button>
        <button 
          className={`auction-tab ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming ({upcomingAuctions.length})
        </button>
        <button 
          className={`auction-tab ${activeTab === 'recent' ? 'active' : ''}`}
          onClick={() => setActiveTab('recent')}
        >
          Recent ({recentAuctions.length})
        </button>
      </div>

      <div className="auction-content">
        {activeTab === 'live' && (
          <div className="auction-grid">
            {liveAuctions.map(auction => (
              <Link to={`/auction/${auction.id}`} key={auction.id} className="auction-card live">
                <div className="auction-card-image">
                  <img src={auction.image} alt={auction.title} />
                  <div className="live-badge">LIVE</div>
                  <div className="auction-timer">
                    {formatTimer(timers[auction.id])}
                  </div>
                </div>
                <div className="auction-card-content">
                  <h3>{auction.title}</h3>
                  <p className="auction-artist">by {auction.artist}</p>
                  <div className="auction-bid-info">
                    <div>
                      <span className="bid-label">Current Bid</span>
                      <span className="bid-amount">₹{auction.currentBid.toLocaleString()}</span>
                    </div>
                    <div className="bid-count">{auction.bidCount} bids</div>
                  </div>
                  <button className="btn-bid">Place Bid</button>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'upcoming' && (
          <div className="auction-grid">
            {upcomingAuctions.map(auction => (
              <div key={auction.id} className="auction-card upcoming">
                <div className="auction-card-image">
                  <img src={auction.image} alt={auction.title} />
                  <div className="upcoming-badge">UPCOMING</div>
                </div>
                <div className="auction-card-content">
                  <h3>{auction.title}</h3>
                  <p className="auction-artist">by {auction.artist}</p>
                  <div className="auction-bid-info">
                    <div>
                      <span className="bid-label">Starting Bid</span>
                      <span className="bid-amount">₹{auction.startingBid.toLocaleString()}</span>
                    </div>
                  </div>
                  <p className="start-time">{getTimeUntilStart(auction.startTime)}</p>
                  <button className="btn-notify">Notify Me</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'recent' && (
          <div className="auction-grid">
            {recentAuctions.map(auction => (
              <div key={auction.id} className="auction-card recent">
                <div className="auction-card-image">
                  <img src={auction.image} alt={auction.title} />
                  <div className="sold-badge">SOLD</div>
                </div>
                <div className="auction-card-content">
                  <h3>{auction.title}</h3>
                  <p className="auction-artist">by {auction.artist}</p>
                  <div className="auction-bid-info">
                    <div>
                      <span className="bid-label">Final Bid</span>
                      <span className="bid-amount">₹{auction.finalBid.toLocaleString()}</span>
                    </div>
                    <div className="bid-count">{auction.bidCount} bids</div>
                  </div>
                  <p className="winner-info">Won by {auction.winner}</p>
                  <p className="end-date">{formatDate(auction.endDate)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionPage;