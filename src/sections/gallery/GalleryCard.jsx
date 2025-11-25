import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import './GalleryCard.css';

const GalleryCard = ({ artwork, isWishlisted, onToggleWishlist }) => {
  const navigate = useNavigate();
  const { user, openModal } = useAuth();
  const { showNotification } = useNotification();

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    
    if (!user) {
      showNotification('Please log in to add items to your wishlist.', 'warning');
      return;
    }
    
    if (onToggleWishlist) {
      onToggleWishlist(artwork.id); 
    }
  };

  const handleCardClick = () => {
    navigate(`/artwork/${artwork.id}`);
  };

  return (
    <div 
      className="gallery-card" 
      onClick={handleCardClick}
    >
      <div className="gallery-card-image-wrapper">
        <img src={artwork.image} alt={artwork.title} className="gallery-card-image" />
      </div>

      <h3 className="gallery-card-title">{artwork.title}</h3>

      <button 
        className={`gallery-wishlist-btn ${isWishlisted ? 'active' : ''}`}
        onClick={handleWishlistClick}
        title="Add to wishlist"
      >
        {isWishlisted ? '♥' : '♡'}
      </button>

      <div className="gallery-card-info-pane">
        <div className="info-left">
          <p className="gallery-card-artist">{artwork.artistName}</p>
          <p className="gallery-card-type">{artwork.type}</p>
        </div>
        <div className="info-right">
          <span className="gallery-card-price-label">Price</span>
          <p className="gallery-card-price">
            ${artwork.price ? artwork.price.toLocaleString() : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;