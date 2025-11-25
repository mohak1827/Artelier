import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../contexts/FavoritesContext';
import { allArtworks } from '../gallery/mockGalleryData';
import './Profile.css';

const Wishlist = () => {
  const { favoriteArtworks, toggleArtworkFavorite } = useFavorites();

  const wishlistItems = allArtworks.filter(art => favoriteArtworks.includes(art.id));

  if (wishlistItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2 style={{ marginBottom: '1rem', color: '#1a202c' }}>Your Wishlist is empty.</h2>
        <p style={{ color: '#718096', marginBottom: '2rem' }}>
          Save items you love here to find them easily later!
        </p>
        <Link to="/gallery" className="primary-btn">
          Browse Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h1 style={{ marginBottom: '2rem', fontSize: '1.8rem', color: '#1a202c' }}>
        My Wishlist ({wishlistItems.length})
      </h1>

      <div className="wishlist-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
        gap: '2rem' 
      }}>
        {wishlistItems.map((item) => (
          <div 
            key={item.id} 
            className="action-card" 
            style={{
              display: 'flex', 
              flexDirection: 'column', 
              padding: '1rem',
              height: '100%',
              justifyContent: 'space-between'
            }}
          >
            <Link to={`/artwork/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img 
                src={item.image} 
                alt={item.title} 
                style={{
                  width: '100%', 
                  height: '220px', 
                  objectFit: 'cover', 
                  borderRadius: '8px', 
                  marginBottom: '1rem'
                }} 
              />
              <div>
                <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.3rem', color: '#2d3748' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#718096', margin: 0, fontSize: '0.9rem' }}>
                  {item.artistName}
                </p>
              </div>
            </Link>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginTop: '1.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid #f1f5f9'
            }}>
              <span style={{ fontWeight: '700', color: '#2d3748' }}>
                ₹{item.price.toLocaleString()}
              </span>
              
              <button 
                onClick={() => toggleArtworkFavorite(item.id)} 
                style={{
                  padding: '6px 14px', 
                  background: '#fee2e2', 
                  color: '#dc2626', 
                  border: 'none', 
                  borderRadius: '20px', 
                  cursor: 'pointer', 
                  fontSize: '0.85rem', 
                  fontWeight: '600',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = '#fecaca'}
                onMouseOut={(e) => e.target.style.background = '#fee2e2'}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;