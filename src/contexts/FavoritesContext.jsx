import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../services/api';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favoriteArtworks, setFavoriteArtworks] = useState([]);
  const [favoriteArtists, setFavoriteArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch favorites when user logs in
  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setFavoriteArtworks([]);
      setFavoriteArtists([]);
      setLoading(false);
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await api.get('/favorites');
      setFavoriteArtworks(response.data.wishlist || []);
      setFavoriteArtists(response.data.favArtists || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleArtworkFavorite = async (artworkId) => {
    if (!user) {
      return { success: false, message: 'Please login to add favorites' };
    }

    try {
      // Optimistic update
      const isFavorited = favoriteArtworks.includes(artworkId);
      if (isFavorited) {
        setFavoriteArtworks(prev => prev.filter(id => id !== artworkId));
      } else {
        setFavoriteArtworks(prev => [...prev, artworkId]);
      }

      // API call
      const response = await api.post(`/favorites/artwork/${artworkId}`);
      
      // Update with server response
      setFavoriteArtworks(response.data.wishlist);
      
      return { 
        success: true, 
        isFavorited: response.data.isFavorited,
        message: response.data.message 
      };
    } catch (error) {
      console.error('Error toggling artwork favorite:', error);
      // Revert optimistic update on error
      fetchFavorites();
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update favorite' 
      };
    }
  };

  const toggleArtistFavorite = async (artistId) => {
    if (!user) {
      return { success: false, message: 'Please login to follow artists' };
    }

    try {
      const idStr = String(artistId);

      // Optimistic update using string ids
      const isFavorited = favoriteArtists.includes(idStr);
      if (isFavorited) {
        setFavoriteArtists(prev => prev.filter(id => id !== idStr));
      } else {
        setFavoriteArtists(prev => [...prev, idStr]);
      }

      // API call
      const response = await api.post(`/favorites/artist/${idStr}`);
      
      // Update with server response
      setFavoriteArtists(response.data.favArtists);
      
      return { 
        success: true, 
        isFavorited: response.data.isFavorited,
        message: response.data.message 
      };
    } catch (error) {
      console.error('Error toggling artist favorite:', error);
      // Revert optimistic update on error
      fetchFavorites();
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update favorite' 
      };
    }
  };

  const isArtworkFavorited = (artworkId) => {
    return favoriteArtworks.includes(artworkId);
  };

  const isArtistFavorited = (artistId) => {
    return favoriteArtists.includes(String(artistId));
  };

  const value = {
    favoriteArtworks,
    favoriteArtists,
    loading,
    toggleArtworkFavorite,
    toggleArtistFavorite,
    isArtworkFavorited,
    isArtistFavorited,
    refreshFavorites: fetchFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
