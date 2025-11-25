import React from 'react';
import './ArtistShowcase.css';
import ArtworkCard from '../../components/ArtworkCard';
import { useFavorites } from '../../contexts/FavoritesContext';

const ArtistShowcase = ({ artworks }) => {
  const { favoriteArtworks, toggleArtworkFavorite } = useFavorites();

  return (
    <div className="showcase-container">
      <h2 className="showcase-title">Featured Artworks</h2>
      <div className="gallery-grid">
        {artworks.map((art) => (
          <ArtworkCard
            key={art.id}
            id={art.id}
            image={art.image}
            title={art.title}
            artistName={art.artistName}
            price={`₹${art.price.toLocaleString()}`}
            category={art.type}
            onFavorite={toggleArtworkFavorite}
            isFavorited={favoriteArtworks.includes(art.id)}
            showFavorite={true}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtistShowcase;