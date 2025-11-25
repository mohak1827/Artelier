import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useNotification } from '../../contexts/NotificationContext';

import api from '../../services/api';
import ArtworkCard from '../../components/ArtworkCard';
import { allArtworks } from '../../sections/gallery/mockGalleryData';

import './ArtworkDetailPage.css';

const ArtworkDetailPage = () => {
  const { id } = useParams();
  const { user, openModal, updateUserState } = useAuth();
  const navigate = useNavigate();
  const { isArtworkFavorited, toggleArtworkFavorite } = useFavorites();
  const { showNotification } = useNotification();
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const artwork = allArtworks.find(art => art.id === id) || allArtworks[0];

  const artistPageId = artwork?.artistId ? String(artwork.artistId).replace(/^a/, '') : '';

  useEffect(() => {
    if (artwork?.id) {
      setIsFavorited(isArtworkFavorited(artwork.id));
    }
  }, [artwork.id, isArtworkFavorited]);

  const moreFromArtist = allArtworks
    .filter(art => art.artistId === artwork.artistId && art.id !== artwork.id)
    .slice(0, 4);

  const similarArtworks = allArtworks
    .filter(art => art.type === artwork.type && art.artistId !== artwork.artistId)
    .slice(0, 6);

  const handleFavorite = async () => {
    if (!user) {
      showNotification('Please log in to add items to your favorites.', 'warning');
      return;
    }

    const result = await toggleArtworkFavorite(artwork.id);

    if (result.success) {
      if (result.message) {
        showNotification(result.message, 'success');
      }
    } else if (result.message) {
      showNotification(result.message, 'error');
    }
  };

  const isInCart = user?.cart?.some(item => item.title === artwork.title);

  const handleAddToCart = async () => {
    if (!user) {
      showNotification('Please log in to add items to your cart.', 'warning');
      return;
    }

    try {
      if (isInCart) {
        const cartItem = user.cart.find(item => item.title === artwork.title);
        if (!cartItem) return;

        const { data } = await api.delete(`/user/cart/remove/${cartItem.artworkId}`);
        if (data.success) {
          updateUserState({ cart: data.cart });
        }
      } else {
        const newItem = {
          artworkId: `art-${artwork.id}`,
          title: artwork.title,
          price: `₹${artwork.price.toLocaleString()}`,
          image: artwork.image,
          artistName: artwork.artistName,
        };

        const { data } = await api.post('/user/cart/add', newItem);
        if (data.success) {
          updateUserState({ cart: data.cart });
        }
      }
    } catch (err) {
      console.error('Failed to toggle cart item', err);
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      showNotification('Please log in to purchase artworks.', 'warning');
      return;
    }

    const item = {
      artworkId: `art-${artwork.id}`,
      title: artwork.title,
      price: `₹${artwork.price.toLocaleString()}`,
      image: artwork.image,
      artistName: artwork.artistName,
    };

    navigate('/payment', {
      state: {
        items: [item],
        total: `₹${artwork.price.toLocaleString()}`,
        clearCart: false,
      },
    });
  };

  const images = [artwork.image, artwork.image, artwork.image];

  return (
    <div className="artwork-detail-page">
      <div className="artwork-breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-separator">›</span>
        <Link to="/gallery">Gallery</Link>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">{artwork.title}</span>
      </div>

      <div className="artwork-detail-container">
        <div className="artwork-image-section">
          <div className="artwork-main-image">
            <img src={images[selectedImage]} alt={artwork.title} />
            <button 
              className={`artwork-favorite-btn ${isFavorited ? 'favorited' : ''}`}
              onClick={handleFavorite}
              aria-label="Add to favorites"
            >
              {isFavorited ? '❤️' : '🤍'}
            </button>
          </div>
          
          <div className="artwork-thumbnails">
            {images.map((img, index) => (
              <button
                key={index}
                className={`artwork-thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`View ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="artwork-info-section">
          <div className="artwork-header">
            <h1 className="artwork-title">{artwork.title}</h1>
            <Link to={`/artist/${artistPageId}`} className="artwork-artist">
              by {artwork.artistName}
            </Link>
          </div>

          <div className="artwork-price-section">
            <span className="artwork-price">₹{artwork.price.toLocaleString()}</span>
            <span className="artwork-category-badge">{artwork.type}</span>
          </div>

          <div className="artwork-actions">
            <button className="btn-primary" onClick={handleBuyNow}>
              Buy Now
            </button>
            <button
              className={`btn-secondary ${isInCart ? 'added' : ''}`}
              onClick={handleAddToCart}
            >
              {isInCart ? 'Added to Cart' : 'Add to Cart'}
            </button>
          </div>

          <div className="artwork-description">
            <h3>About this Artwork</h3>
            <p>
              "{artwork.title}" is a stunning {artwork.type.toLowerCase()} that showcases {artwork.artistName}'s 
              unique artistic vision. This piece exemplifies contemporary art at its finest, combining technical 
              mastery with emotional depth.
            </p>
            <p>
              The artwork captures a moment of creative brilliance, inviting viewers to explore its intricate 
              details and discover new meanings with each viewing. Perfect for collectors seeking distinctive 
              pieces that make a statement.
            </p>
          </div>

          <div className="artwork-specifications">
            <h3>Specifications</h3>
            <div className="spec-grid">
              <div className="spec-item">
                <span className="spec-label">Medium</span>
                <span className="spec-value">{artwork.type}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Year</span>
                <span className="spec-value">2024</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Size</span>
                <span className="spec-value">36 × 48 in</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Rarity</span>
                <span className="spec-value">Unique</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Frame</span>
                <span className="spec-value">Unframed</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Certificate</span>
                <span className="spec-value">Included</span>
              </div>
            </div>
          </div>

          <div className="artwork-artist-info">
            <h3>About the Artist</h3>
            <Link to={`/artist/${artistPageId}`} className="artist-card-mini">
              <div className="artist-avatar-placeholder">
                {artwork.artistName.charAt(0)}
              </div>
              <div className="artist-mini-info">
                <h4>{artwork.artistName}</h4>
                <p>Contemporary Artist</p>
              </div>
              <span className="view-profile-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>

      {moreFromArtist.length > 0 && (
        <section className="artwork-related-section">
          <div className="section-header">
            <h2>More from {artwork.artistName}</h2>
            <Link to={`/artist/${artistPageId}`} className="view-all-link">
              View All →
            </Link>
          </div>
          <div className="artwork-horizontal-scroll">
            {moreFromArtist.map(art => (
              <div key={art.id} className="horizontal-card-wrapper">
                <ArtworkCard
                  id={art.id}
                  image={art.image}
                  title={art.title}
                  artistName={art.artistName}
                  price={`₹${art.price.toLocaleString()}`}
                  category={art.type}
                  showFavorite={false}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {similarArtworks.length > 0 && (
        <section className="artwork-similar-section">
          <div className="section-header">
            <h2>Similar Artworks You May Like</h2>
            <Link to="/gallery" className="view-all-link">
              Explore Gallery →
            </Link>
          </div>
          <div className="artwork-grid">
            {similarArtworks.map(art => (
              <ArtworkCard
                key={art.id}
                id={art.id}
                image={art.image}
                title={art.title}
                artistName={art.artistName}
                price={`₹${art.price.toLocaleString()}`}
                category={art.type}
                showFavorite={false}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ArtworkDetailPage;