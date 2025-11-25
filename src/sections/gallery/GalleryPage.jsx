import React, { useState, useMemo } from 'react';
import GalleryHeader from './GalleryHeader';
import GalleryFilter from './GalleryFilter';
import GalleryGrid from './GalleryGrid';
import { allArtworks, allArtists, allArtworkTypes } from './mockGalleryData';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import './GalleryPage.css';

const ITEMS_PER_PAGE = 12;

const GalleryPage = () => {
  const { user, openModal } = useAuth();
  const { showNotification } = useNotification();

  const [filters, setFilters] = useState({
    price: 'all',
    artist: 'all',
    type: 'all',
  });
  
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [wishlist, setWishlist] = useState([]);

  const handleToggleWishlist = (artworkId) => {
    if (!user) {
      showNotification('Please log in to add items to your wishlist.', 'warning');
      return;
    }

    setWishlist(prevWishlist => 
      prevWishlist.includes(artworkId)
        ? prevWishlist.filter(id => id !== artworkId)
        : [...prevWishlist, artworkId]
    );
  };

  const filteredArtworks = useMemo(() => {
    return allArtworks.filter(artwork => {
      const priceRange = filters.price.split('-');

      if (filters.price !== 'all') {
        const minPrice = parseInt(priceRange[0], 10);
        const maxPrice = priceRange[1] ? parseInt(priceRange[1], 10) : Infinity;
        if (artwork.price < minPrice || artwork.price > maxPrice) {
          return false;
        }
      }
      
      if (filters.artist !== 'all' && artwork.artistId !== filters.artist) {
        return false;
      }
      
      if (filters.type !== 'all' && artwork.type !== filters.type) {
        return false;
      }
      
      return true;
    });
  }, [filters]);

  const displayedArtworks = filteredArtworks.slice(0, visibleCount);

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleViewMore = () => {
    setVisibleCount(prevCount => prevCount + ITEMS_PER_PAGE);
  };
  
  const showViewMore = visibleCount < filteredArtworks.length;

  return (
    <div className="gallery-page">
      <main className="gallery-page-content">
        <GalleryHeader 
          totalArtworks={allArtworks.length} 
          totalArtists={allArtists.length} 
        />
        
        <GalleryFilter 
          artists={allArtists}
          artworkTypes={allArtworkTypes}
          onFilterChange={handleFilterChange}
          currentFilters={filters}
        />
        
        <GalleryGrid 
          artworks={displayedArtworks}
        />

        {showViewMore && (
          <div className="view-more-container">
            <button onClick={handleViewMore} className="view-more-button">
              View More
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default GalleryPage;