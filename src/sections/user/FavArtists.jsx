import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../contexts/FavoritesContext';
import { artistsData } from '../../artistsData';
import './Profile.css';

const FavArtists = () => {
  const { favoriteArtists, toggleArtistFavorite } = useFavorites();

  const favoriteArtistItems = artistsData.filter(artist =>
    favoriteArtists.includes(String(artist.id))
  );

  if (favoriteArtistItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2 style={{ marginBottom: '1rem', color: '#1a202c' }}>No favourite artists yet!</h2>
        <p style={{ color: '#718096', marginBottom: '2rem' }}>
          Follow artists to stay updated on their latest works.
        </p>
        <Link to="/artists" className="primary-btn">
          Discover Artists
        </Link>
      </div>
    );
  }

  return (
    <div className="fav-artists-container">
      <h1 style={{ marginBottom: '2rem', fontSize: '1.8rem', color: '#1a202c' }}>
        Favourite Artists ({favoriteArtistItems.length})
      </h1>

      <div className="wishlist-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
        gap: '2rem' 
      }}>
        {favoriteArtistItems.map((artist) => (
          <div 
            key={artist.id} 
            className="action-card" 

            style={{
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              padding: '1.5rem'
            }}
          >
            <Link to={`/artist/${artist.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img 
                src={artist.image} 
                alt={artist.name} 

                style={{
                  width: '100px', 
                  height: '100px', 
                  objectFit: 'cover', 
                  borderRadius: '50%', 
                  marginBottom: '1rem',
                  border: '3px solid #f7fafc',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                }} 
              />
              
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.3rem', color: '#2d3748' }}>
                {artist.name}
              </h3>
              
              <p style={{ color: '#718096', fontSize: '0.9rem', margin: '0 0 1rem 0' }}>
                {artist.specialty}
              </p>
            </Link>

            <button 
              onClick={() => toggleArtistFavorite(artist.id)} 

              style={{
                padding: '6px 16px', 
                background: 'white', 
                color: '#ef4444', 
                border: '1px solid #ef4444', 
                borderRadius: '20px', 
                cursor: 'pointer', 
                fontSize: '0.85rem', 
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#ef4444';
                e.target.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'white';
                e.target.style.color = '#ef4444';
              }}
            >
              Unfollow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavArtists;