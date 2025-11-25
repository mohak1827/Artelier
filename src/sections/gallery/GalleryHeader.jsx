import React from 'react';
import './GalleryHeader.css';

const headerImageUrl = 'https://png.pngtree.com/background/20230520/original/pngtree-light-light-art-gallery-with-dark-corridor-picture-image_2669850.jpg';

const GalleryHeader = ({ totalArtworks, totalArtists }) => {
  return (
    <div className="gallery-header" style={{ backgroundImage: `url(${headerImageUrl})` }}>
      <div className="header-overlay">
        <h1 className="header-title">The Artelier Gallery</h1>
        <p className="header-subtitle">Explore our curated collection of contemporary masterpieces.</p>
        
        <div className="header-stats-container">
          <div className="stat-item">
            <span className="stat-number">{totalArtworks}</span>
            <span className="stat-label">Artworks</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{totalArtists}</span>
            <span className="stat-label">Artists</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Access</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryHeader;