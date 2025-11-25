import React from 'react';
import { Link } from 'react-router-dom';
import './ArtistCard.css';

const ArtistCard = ({ 
  id, 
  name, 
  image, 
  specialty, 
  artworkCount,
  country,
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

  const profileUrl = `/artist/${id}`;

  return (
    <Link to={profileUrl} className="artist-card">
      <div className="artist-card-image-container">
        {image ? (
          <img src={image} alt={name} className="artist-card-image" />
        ) : (
          <div className="artist-card-placeholder">
            <span className="artist-card-initial">{name.charAt(0)}</span>
          </div>
        )}
        {showFavorite && (
          <button 
            className={`artist-card-favorite ${isFavorited ? 'favorited' : ''}`}
            onClick={handleFavoriteClick}
            aria-label="Add to favorite artists"
          >
            {isFavorited ? '⭐' : '☆'}
          </button>
        )}
      </div>
      
      <div className="artist-card-content">
        <h3 className="artist-card-name">{name}</h3>
        {specialty && <p className="artist-card-specialty">{specialty}</p>}
        
        <div className="artist-card-footer">
          {country && (
            <span className="artist-card-country">
              <span className="artist-card-icon">📍</span>
              {country}
            </span>
          )}
          {artworkCount && (
            <span className="artist-card-count">
              {artworkCount} {artworkCount === 1 ? 'artwork' : 'artworks'}
            </span>
          )}
        </div>
      </div>
      
      <div className="artist-card-hover-overlay">
        <span className="artist-card-view-profile">View Profile</span>
      </div>
    </Link>
  );
};

export default ArtistCard;
