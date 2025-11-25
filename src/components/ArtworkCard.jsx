import React from 'react';
import { Link } from 'react-router-dom';
import './ArtworkCard.css';

const ArtworkCard = ({ 
  id, 
  image, 
  title, 
  artistName, 
  price, 
  category,
  onFavorite,
  isFavorited = false,
  showFavorite = true 
}) => {
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onFavorite) {
      onFavorite(id);
    }
  };

  return (
    <Link to={`/artwork/${id}`} className="artwork-card">
      <div className="artwork-card-image-container">
        <img src={image} alt={title} className="artwork-card-image" />
        {showFavorite && (
          <button 
            className={`artwork-card-favorite ${isFavorited ? 'favorited' : ''}`}
            onClick={handleFavoriteClick}
            aria-label="Add to favorites"
          >
            {isFavorited ? '❤️' : '🤍'}
          </button>
        )}
        <div className="artwork-card-overlay">
          <span className="artwork-card-view-details">View Details</span>
        </div>
      </div>
      
      <div className="artwork-card-content">
        <h3 className="artwork-card-title">{title}</h3>
        <p className="artwork-card-artist">by {artistName}</p>
        
        <div className="artwork-card-footer">
          {category && <span className="artwork-card-category">{category}</span>}
          {price && <span className="artwork-card-price">{price}</span>}
        </div>
      </div>
    </Link>
  );
};

export default ArtworkCard;
