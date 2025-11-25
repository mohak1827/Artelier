import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext'; 
import { useNotification } from './contexts/NotificationContext';

import './ArtworkCard.css';

const ArtworkCard = ({ artwork, isWishlisted, onToggleWishlist, isHomepage }) => {
  const navigate = useNavigate();
  const { user, openModal } = useAuth(); 
  const { showNotification } = useNotification();

  const handleWishlistClick = (e) => {
    e.stopPropagation(); 

    if (!user) {
      if (isHomepage) {
        showNotification('Please log in to add items to your wishlist.', 'warning');
      } else {
        openModal(); 
      }
      return;
    }
    
    if (onToggleWishlist) {
      onToggleWishlist(artwork.id);
    }
  };

  const handleViewCatalog = (e) => {
    e.stopPropagation(); 
    navigate(`/artwork/${artwork.id}`);
  };

  const handleCardClick = () => {
    navigate(`/artwork/${artwork.id}`);
  };

  return (
    <div className="art-horizontal-item" onClick={handleCardClick}>
      <img src={artwork.image} alt={artwork.type} />
      <div className="art-item-content">
        <button 
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label="Add to wishlist"
        >
          {isWishlisted ? '♥' : '♡'}
        </button>
        <p className="price">{artwork.price}</p>
        <p className="type">{artwork.type}</p>
        <p className="origin">{artwork.origin}</p>
        <button 
          className="view-catalog-btn"
          onClick={handleViewCatalog}
        >
          View Catalog
        </button>
      </div>
    </div>
  );
};

export default ArtworkCard;