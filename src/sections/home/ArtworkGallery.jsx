import React from 'react';
import ArtworkCard from '../../ArtworkCard';
import { allArtworks } from '../gallery/mockGalleryData';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

import './ArtworkGallery.css';

const ArtworkGallery = ({ currentUser, onOpenAuthModal }) => {
  const { user } = useAuth();
  const { isArtworkFavorited, toggleArtworkFavorite } = useFavorites();
  const { showNotification } = useNotification();

  const artworks = allArtworks.slice(0, 6).map((art) => ({
    id: art.id,
    image: art.image,

    price: `₹${art.price.toLocaleString()}`,
  
    type: art.title,
  
    origin: `by ${art.artistName}`,
  }));

  
  const handleToggleWishlist = async (artworkId) => {
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

  return (
    <div className="gallery-showcase-horizontal">
      <h2 className="gallery-title-horizontal">Explore Global Creativity</h2>
      <div className="art-scroll-container">
        <div className="art-horizontal-scroll">
          {artworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              isWishlisted={isArtworkFavorited(artwork.id)}
              onToggleWishlist={handleToggleWishlist}
              currentUser={currentUser}
              isHomepage
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtworkGallery;