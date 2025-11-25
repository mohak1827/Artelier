import React from 'react';
import ArtworkCard from '../../components/ArtworkCard';
import { useAuth } from '../../contexts/AuthContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useNotification } from '../../contexts/NotificationContext';
import './GalleryGrid.css';

const GalleryGrid = ({ artworks }) => {
  const { user } = useAuth();
  const { isArtworkFavorited, toggleArtworkFavorite } = useFavorites();
  const { showNotification } = useNotification();

  const handleFavorite = async (artworkId) => {
    if (!user) {
      showNotification('Please log in to add items to your wishlist.', 'warning');
      return;
    }

    const result = await toggleArtworkFavorite(artworkId);

    if (result.success) {
      if (result.message) {
        showNotification(result.message, 'success');
      }
    } else if (result.message) {
      showNotification(result.message, 'error');
    }
  };

  if (artworks.length === 0) {
    return <p className="no-results-message">No artworks match your criteria.</p>;
  }

  return (
    <div className="gallery-grid">
      {artworks.map(artwork => (
        <ArtworkCard 
          key={artwork.id} 
          id={artwork.id}
          image={artwork.image}
          title={artwork.title}
          artistName={artwork.artistName}
          price={`₹${artwork.price.toLocaleString()}`}
          category={artwork.type}
          onFavorite={handleFavorite}
          isFavorited={isArtworkFavorited(artwork.id)}
          showFavorite={true}
        />
      ))}
    </div>
  );
};

export default GalleryGrid;