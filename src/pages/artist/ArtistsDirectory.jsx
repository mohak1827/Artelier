import React, { useState } from 'react';
import ArtistCard from '../../components/ArtistCard';
import { artistsData } from '../../artistsData';
import { allArtworks } from '../../sections/gallery/mockGalleryData';

import './ArtistsDirectory.css';

const ArtistsDirectory = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', ...new Set(artistsData.map(artist => artist.category))];

  const filteredArtists = activeFilter === 'All' 
    ? artistsData 
    : artistsData.filter(artist => artist.category === activeFilter);

  return (
    <div className="directory-page">
      <header className="directory-hero">
        <div className="directory-hero-content">
          <span className="directory-hero-subtitle">Curated Talent</span>
          <h1 className="directory-hero-title">The Creator Collective</h1>
          <p className="directory-hero-description">
            Explore the visionaries shaping the future of art. 
            Filter by style to find the perfect match for your collection.
          </p>
        </div>
        <div className="directory-hero-overlay"></div>
      </header>

      <section className="directory-filter-section">
        <div className="directory-filter-container">
          {categories.map(category => (
            <button 
              key={category} 
              className={`directory-filter-btn ${activeFilter === category ? 'active' : ''}`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <p className="directory-result-count">
          Showing {filteredArtists.length} {filteredArtists.length === 1 ? 'Artist' : 'Artists'}
        </p>
      </section>

      <section className="directory-grid-section">
        <div className="directory-grid">
          {filteredArtists.map(artist => {
            const artworkCount = allArtworks.filter(a => a.artistId === `a${artist.id}`).length;
            return (
              <ArtistCard 
                key={artist.id}
                id={artist.id}
                name={artist.name}
                image={artist.image}
                specialty={artist.specialty}
                artworkCount={artworkCount}
                country={artist.location}
                showFavorite={false}
              />
            );
          })}
        </div>
        
        {filteredArtists.length === 0 && (
          <div className="directory-no-results">
            <h3>No artists found.</h3>
            <button onClick={() => setActiveFilter('All')}>Reset Filters</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ArtistsDirectory;