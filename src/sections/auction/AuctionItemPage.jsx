import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './AuctionItemPage.css';
import { liveAuctions, getTimeRemaining } from './auctionsData';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

const AuctionItemPage = () => {
  const { id } = useParams();
  const { user, openModal } = useAuth();
  const { showNotification } = useNotification();

  const auction = liveAuctions.find((item) => item.id === id) || liveAuctions[0];

  const bidderNames = [
    'ArtBot',
    'Collector X',
    'Gallery Edge',
    'Mystery Bidder',
    'Studio Nova',
    'BidWave',
  ];

  const [timeLeft, setTimeLeft] = useState(() =>
    auction ? getTimeRemaining(auction.endTime) : null
  );
  const [currentBid, setCurrentBid] = useState(auction ? auction.currentBid : 0);
  const [bidInput, setBidInput] = useState('');
  const [bids, setBids] = useState([
    auction
      ? { bidder: 'Opening Bid', amount: auction.currentBid, isYou: false }
      : null,
  ].filter(Boolean));

  const [isEnded, setIsEnded] = useState(() =>
    timeLeft && timeLeft.total <= 0
  );
  const [error, setError] = useState('');
  const [showResultOverlay, setShowResultOverlay] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (!auction) return;

    const interval = setInterval(() => {
      const next = getTimeRemaining(auction.endTime);
      setTimeLeft(next);

      if (next.total <= 0) {
        clearInterval(interval);
        setIsEnded(true);
        setShowResultOverlay(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [auction]);

  // Auto-bidder that places bids every ~6 seconds with random bidder names
  useEffect(() => {
    if (!auction) return;
    if (isEnded) return;

    const intervalId = setInterval(() => {
      setBids((prevBids) => {
        const latest = prevBids[0];
        const baseAmount = latest ? latest.amount : auction.currentBid;

        const increment = Math.floor(auction.currentBid * 0.02 + 500);
        const autoAmount = baseAmount + increment;

        const randomName = bidderNames[Math.floor(Math.random() * bidderNames.length)];

        const autoBid = {
          bidder: randomName,
          amount: autoAmount,
          isYou: false,
        };

        setCurrentBid(autoAmount);
        return [autoBid, ...prevBids].slice(0, 3);
      });
    }, 6000);

    return () => clearInterval(intervalId);
  }, [auction, isEnded]);

  if (!auction) {
    return (
      <div className="auction-item-page-wrapper">
        <div className="auction-item-container">
          <div className="auction-details-container">
            <h1 className="auction-item-title">Auction not found</h1>
            <p className="auction-item-description">
              The auction you are looking for does not exist or is no longer live.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const formatTimer = (t) => {
    if (!t || t.total <= 0) return '00:00';
    const m = String(t.minutes).padStart(2, '0');
    const s = String(t.seconds).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handlePlaceBid = () => {
    if (isEnded) return;

    if (!user) {
      showNotification('Please log in to place a bid.', 'warning');
      return;
    }

    const value = parseInt(bidInput, 10);
    if (Number.isNaN(value)) {
      setError('Please enter a valid number.');
      return;
    }

    const latest = bids[0];
    const effectiveCurrent = latest ? latest.amount : currentBid;

    if (value <= effectiveCurrent) {
      setError(
        `Bid must be higher than current bid (₹${effectiveCurrent.toLocaleString()}).`
      );
      return;
    }

    const newBid = {
      bidder: 'You',
      amount: value,
      isYou: true,
    };

    setCurrentBid(value);
    setBids((prev) => [newBid, ...prev].slice(0, 3));
    setBidInput('');
    setError('');
  };

  const highestBid = bids.length ? bids[0] : null;

  return (
    <div className="auction-item-page-wrapper">
      <div className="auction-item-container">
        <div className="auction-image-container">
          <img src={auction.image} alt={auction.title} className="auction-item-image-large" />
        </div>

        <div className="auction-details-container">
          <div className="auction-header-row">
            <div>
              <h1 className="auction-item-title">{auction.title}</h1>
              <p className="auction-item-artist">by {auction.artist}</p>
            </div>
            <div className={`auction-timer-chip ${isEnded ? 'ended' : ''}`}>
              {isEnded ? 'Auction Ended' : `Time Left: ${formatTimer(timeLeft)}`}
            </div>
          </div>

          <p className="auction-item-description">{auction.description}</p>

          <div className="auction-meta-info">
            <span>Category: {auction.category}</span>
            <span>Size: {auction.size}</span>
            <span>Year: {auction.year}</span>
          </div>

          <div className="bidding-box">
            <div className="bid-info">
              <span className="bid-label">Current Bid</span>
              <span className="current-bid-amount">
                ₹{currentBid.toLocaleString()}
              </span>
              {highestBid && (
                <span className="last-bidder">
                  Highest bid by {highestBid.bidder}
                </span>
              )}
            </div>

            <div className="bid-action">
              {!isEnded ? (
                <>
                  <p className="minimum-bid-text">
                    Enter your bid amount (must be higher than current bid).
                  </p>
                  <div className="bid-input-row">
                    <span className="currency-prefix">₹</span>
                    <input
                      type="number"
                      className="bid-input"
                      value={bidInput}
                      onChange={(e) => setBidInput(e.target.value)}
                      placeholder={(currentBid + 1000).toString()}
                    />
                    <button
                      className="place-bid-button"
                      onClick={handlePlaceBid}
                    >
                      Place Bid
                    </button>
                  </div>
                  {error && <p className="bid-error">{error}</p>}

                  {bids.length > 0 && (
                    <div className="bid-history">
                      <h4>Last 3 bids</h4>
                      <ul>
                        {bids.map((bid, index) => (
                          <li key={index}>
                            <span className="bidder-name">{bid.bidder}</span>
                            <span className="bid-amount">₹{bid.amount.toLocaleString()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <div className="auction-ended-box">
                  {highestBid ? (
                    highestBid.bidder === 'You' ? (
                      <>
                        <h3 className="auction-ended-title success">Congratulations!</h3>
                        <p>
                          You won this auction with a final bid of{' '}
                          <strong>₹{highestBid.amount.toLocaleString()}</strong>.
                        </p>
                        <p className="auction-ended-note">
                          Our team will contact you shortly to complete the purchase.
                        </p>
                      </>
                    ) : (
                      <>
                        <h3 className="auction-ended-title lose">Better luck next time</h3>
                        <p>
                          Final bid was{' '}
                          <strong>₹{highestBid.amount.toLocaleString()}</strong> by{' '}
                          <strong>{highestBid.bidder}</strong>.
                        </p>
                        <p className="auction-ended-note">
                          Explore other live auctions to find your next artwork.
                        </p>
                      </>
                    )
                  ) : (
                    <>
                      <h3 className="auction-ended-title">Auction finished</h3>
                      <p>No bids were placed in this auction.</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isEnded && showResultOverlay && (
        <div className="auction-result-overlay">
          <div className="auction-result-backdrop" onClick={() => setShowResultOverlay(false)} />
          <div className="auction-result-modal">
            <button
              className="auction-result-close"
              type="button"
              onClick={() => setShowResultOverlay(false)}
            >
              ×
            </button>
            {highestBid ? (
              highestBid.bidder === 'You' ? (
                <>
                  <h2 className="auction-result-title success">Congratulations!</h2>
                  <p className="auction-result-text">
                    You won <span className="auction-result-art-title">{auction.title}</span> with a final bid of{' '}
                    <strong>₹{highestBid.amount.toLocaleString()}</strong>.
                  </p>
                  <p className="auction-result-subtext">
                    Our team will reach out shortly to confirm payment and delivery.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="auction-result-title lose">Better luck next time</h2>
                  <p className="auction-result-text">
                    Final bid was <strong>₹{highestBid.amount.toLocaleString()}</strong> by{' '}
                    <strong>{highestBid.bidder}</strong>.
                  </p>
                  <p className="auction-result-subtext">
                    This artwork has found a new home, but there are many more live auctions waiting for you.
                  </p>
                </>
              )
            ) : (
              <>
                <h2 className="auction-result-title">Auction finished</h2>
                <p className="auction-result-text">No bids were placed in this auction.</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionItemPage;