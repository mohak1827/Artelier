import React from 'react';
import './GalleryFilter.css';

const GalleryFilter = ({ artists, artworkTypes, onFilterChange, currentFilters }) => {

  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: '$0 - $1,000', value: '0-1000' },
    { label: '$1,000 - $2,500', value: '1000-2500' },
    { label: '$2,500 - $5,000', value: '2500-5000' },
    { label: '$5,000+', value: '5000' },
  ];

  return (
    <div className="gallery-filter-bar">
      <div className="filter-group">
        <label htmlFor="price-filter">Price</label>
        <select 
          id="price-filter"
          value={currentFilters.price}
          onChange={(e) => onFilterChange('price', e.target.value)}
        >
          {priceRanges.map(range => (
            <option key={range.value} value={range.value}>{range.label}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="artist-filter">Artist</label>
        <select 
          id="artist-filter"
          value={currentFilters.artist}
          onChange={(e) => onFilterChange('artist', e.target.value)}
        >
          <option value="all">All Artists</option>
          {artists.map(artist => (
            <option key={artist.id} value={artist.id}>{artist.name}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="type-filter">Type</label>
        <select 
          id="type-filter"
          value={currentFilters.type}
          onChange={(e) => onFilterChange('type', e.target.value)}
        >
          <option value="all">All Types</option>
          {artworkTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default GalleryFilter;