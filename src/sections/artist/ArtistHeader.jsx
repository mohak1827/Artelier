import React, { useEffect, useState } from 'react';
import './ArtistHeader.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useNotification } from '../../contexts/NotificationContext';
import { artistsData } from '../../artistsData';

const ArtistHeader = ({ artist }) => {
  const { user, openModal } = useAuth();
  const { isArtistFavorited, toggleArtistFavorite } = useFavorites();
  const { showNotification } = useNotification();

  const artistRecord = artistsData.find((a) => a.name === artist.name);
  const artistIdForFav = artistRecord?.id;

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (artistIdForFav) {
      setIsFavorite(isArtistFavorited(artistIdForFav));
    }
  }, [artistIdForFav, isArtistFavorited]);

  const handleToggleFavoriteArtist = async () => {
    if (!user) {
      showNotification('Please log in to follow artists.', 'warning');
      return;
    }

    if (!artistIdForFav) return;

    setIsFavorite(prev => !prev);
    await toggleArtistFavorite(artistIdForFav);
  };

  return (
    <div className="artist-header-container">
      <div className="artist-image-container">
        {artist.imageUrl ? (
          <img 
            src={artist.imageUrl} 
            alt={artist.name} 
            className="artist-profile-image" 
          />
        ) : (
          <div className="artist-avatar-placeholder">
            {artist.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="artist-details">
        <div className="artist-header-top-row">
          <div>
            <h1 className="artist-name">{artist.name}</h1>
            <p className="artist-specialty">{artist.specialty}</p>
          </div>
          <button
            type="button"
            className="artist-fav-btn"
            onClick={handleToggleFavoriteArtist}
            aria-label={isFavorite ? 'Unfavorite artist' : 'Favorite artist'}
          >
            {isFavorite ? <FaHeart className="artist-fav-icon solid" /> : <FaRegHeart className="artist-fav-icon" />}
          </button>
        </div>
        <div className="artist-meta">
          <span><strong>Born:</strong> {artist.birthDate}</span>
          <span><strong>Origin:</strong> {artist.origin}</span>
        </div>
      </div>
    </div>
  );
};

export default ArtistHeader;