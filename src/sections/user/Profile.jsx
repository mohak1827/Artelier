import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

import { useFavorites } from '../../contexts/FavoritesContext';

import ArtworkCard from '../../components/ArtworkCard';
import ArtistCard from '../../components/ArtistCard';
import { allArtworks } from '../gallery/mockGalleryData';

import { artistsData } from '../../artistsData';
import './Profile.css';

const Profile = () => {
  const { user, openModal, logout } = useAuth();
  const navigate = useNavigate();

  const { favoriteArtworks, favoriteArtists, toggleArtworkFavorite, toggleArtistFavorite } = useFavorites();
  const [activeTab, setActiveTab] = useState('overview');

  
  const userStats = {
    wishlistCount: favoriteArtworks.length || user?.wishlist?.length || 0,
    cartCount: user?.cart?.length || 0,
    ordersCount: user?.orders?.length || 0,
    favoriteArtistsCount: favoriteArtists.length || user?.favArtists?.length || 0,
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };



  const favoriteArtworkItems = allArtworks.filter(art => favoriteArtworks.includes(art.id));
  const favoriteArtistItems = artistsData.filter(
    artist => favoriteArtists.includes(String(artist.id))
  );


  if (!user) {
    return (
      <div className="profile-logged-out">
        <div className="logged-out-card">
          <div className="logged-out-icon">🎨</div>
          <h2>Welcome to Artelier</h2>
          <p>Sign in to access your profile, favorites, and personalized recommendations.</p>
          <button className="btn-login" onClick={openModal}>
            Sign In
          </button>
          <div className="logged-out-features">
            <div className="feature-item">
              <span className="feature-icon">❤️</span>
              <span>Save your favorite artworks</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🛒</span>
              <span>Easy checkout process</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⭐</span>
              <span>Follow your favorite artists</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
    
      <div className="profile-header">
        <div className="profile-avatar-section">

          <div className="profile-avatar-placeholder">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <button className="edit-avatar-btn">
            <span>📷</span>
          </button>
        </div>
        
        <div className="profile-info">
          <div className="profile-header-top-row">
            <div>
              <h1 className="profile-name">{user.name}</h1>
              <p className="profile-email">{user.email}</p>
              <p className="profile-about">{user.about || "Art enthusiast and collector"}</p>
            </div>
            <div className="profile-header-actions">
              <Link to="/profile/edit" className="btn-edit-profile">
                Edit Profile
              </Link>
              <button
                className="profile-logout-icon-btn"
                type="button"
                onClick={handleLogout}
                aria-label="Logout"
                title="Logout"
              >
                🚪
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-stats">
        <Link to="/wishlist" className="stat-card">
          <div className="stat-icon">❤️</div>
          <div className="stat-info">
            <span className="stat-value">{userStats.wishlistCount}</span>
            <span className="stat-label">Wishlist</span>
          </div>
        </Link>
        
        <Link to="/cart" className="stat-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-info">
            <span className="stat-value">{userStats.cartCount}</span>
            <span className="stat-label">Cart Items</span>
          </div>
        </Link>
        
        <Link to="/orders" className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <span className="stat-value">{userStats.ordersCount}</span>
            <span className="stat-label">Orders</span>
          </div>
        </Link>
        
        <Link to="/fav-artists" className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <span className="stat-value">{userStats.favoriteArtistsCount}</span>
            <span className="stat-label">Artists</span>
          </div>
        </Link>
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          Favorites
        </button>
        <button 
          className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          Activity
        </button>
      </div>

      
      <div className="profile-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
          
            <section className="profile-section">
              <h2 className="section-title">Quick Actions</h2>
              <div className="quick-actions-grid">
                <Link to="/gallery" className="quick-action-card">
                  <span className="action-icon">🎨</span>
                  <h3>Explore Gallery</h3>
                  <p>Discover new artworks</p>
                </Link>
                
                <Link to="/artists" className="quick-action-card">
                  <span className="action-icon">👥</span>
                  <h3>Browse Artists</h3>
                  <p>Find your favorite creators</p>
                </Link>
                
                <Link to="/auctions" className="quick-action-card">
                  <span className="action-icon">🔨</span>
                  <h3>Live Auctions</h3>
                  <p>Bid on exclusive pieces</p>
                </Link>
                
                <Link to="/wishlist" className="quick-action-card">
                  <span className="action-icon">❤️</span>
                  <h3>My Wishlist</h3>
                  <p>View saved items</p>
                </Link>
              </div>
            </section>

       
            <section className="profile-section">
              <h2 className="section-title">Recent Activity</h2>
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-icon">❤️</span>
                  <div className="activity-text">
                    <p>You added <strong>Abstract Symphony</strong> to your wishlist</p>
                    <span className="activity-time">2 hours ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">⭐</span>
                  <div className="activity-text">
                    <p>You started following <strong>Arjun Singh</strong></p>
                    <span className="activity-time">1 day ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">🛒</span>
                  <div className="activity-text">
                    <p>You added items to your cart</p>
                    <span className="activity-time">3 days ago</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="favorites-tab">
       
            <section className="profile-section">
              <div className="section-header">
                <h2 className="section-title">Favorite Artworks</h2>
                <Link to="/wishlist" className="view-all-link">View All →</Link>
              </div>
              {favoriteArtworkItems.length === 0 ? (
                <p className="empty-state-text">You haven't favorited any artworks yet. Explore the gallery and tap the heart icon to save your favorites.</p>
              ) : (
                <div className="favorites-grid">
                  {favoriteArtworkItems.map(artwork => (
                    <ArtworkCard
                      key={artwork.id}
                      id={artwork.id}
                      image={artwork.image}
                      title={artwork.title}
                      artistName={artwork.artistName}
                      price={`₹${artwork.price.toLocaleString()}`}
                      category={artwork.type}
                      isFavorited={true}
                      showFavorite={true}
                      onFavorite={toggleArtworkFavorite}
                    />
                  ))}
                </div>
              )}
            </section>

          
            <section className="profile-section">
              <div className="section-header">
                <h2 className="section-title">Favorite Artists</h2>
                <Link to="/fav-artists" className="view-all-link">View All →</Link>
              </div>
              {favoriteArtistItems.length === 0 ? (
                <p className="empty-state-text">You aren't following any artists yet. Visit the Artists directory to discover and follow your favorites.</p>
              ) : (
                <div className="artists-grid">
                  {favoriteArtistItems.map(artist => (
                    <ArtistCard
                      key={artist.id}
                      id={artist.id}
                      name={artist.name}
                      image={artist.image}
                      specialty={artist.specialty}
                      artworkCount={allArtworks.filter(a => a.artistId === `a${artist.id}`).length}
                      country={artist.location}
                      isFavorited={true}
                      showFavorite={true}
                      onFavorite={toggleArtistFavorite}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="activity-tab">
            <section className="profile-section">
              <h2 className="section-title">Your Activity</h2>
              <div className="activity-timeline">
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h4>Wishlist Updated</h4>
                    <p>Added 3 new artworks to your wishlist</p>
                    <span className="timeline-date">Today, 2:30 PM</span>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h4>New Artist Follow</h4>
                    <p>You started following Elena Petrova</p>
                    <span className="timeline-date">Yesterday, 5:15 PM</span>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h4>Cart Updated</h4>
                    <p>Added "Golden Radiance" to cart</p>
                    <span className="timeline-date">2 days ago</span>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h4>Profile Updated</h4>
                    <p>You updated your profile information</p>
                    <span className="timeline-date">1 week ago</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

     
      <div className="profile-cta">
        <div className="cta-content">
          <h3>Are you an artist?</h3>
          <p>Join Artelier and showcase your work to collectors worldwide.</p>
        </div>
        <button className="cta-button">Become an Artist</button>
      </div>
    </div>
  );
};

export default Profile;