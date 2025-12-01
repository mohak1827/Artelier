import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    // no-op: live search happens on change
  };

  const updateSearchParam = (value) => {
    const currentPath = location.pathname || '/';
    const params = new URLSearchParams(location.search);

    if (value.trim()) {
      params.set('search', value);
    } else {
      params.delete('search');
    }

    const queryString = params.toString();
    navigate(`${currentPath}${queryString ? `?${queryString}` : ''}`, { replace: true });
  };

  useEffect(() => {
    setQuery('');
  }, [location.pathname]);

  return (
    <form className="search-bar-container" onSubmit={handleSearch}>
      <input 
        type="text" 
        className="search-input"
        placeholder="Search artists, artworks..."
        value={query}
        onChange={(e) => {
          const value = e.target.value;
          setQuery(value);
          updateSearchParam(value);
        }}
      />

      <button type="submit" className="search-btn" aria-label="Search">
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;