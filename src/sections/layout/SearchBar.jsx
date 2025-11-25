import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/gallery?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form className="search-bar-container" onSubmit={handleSearch}>
      <input 
        type="text" 
        className="search-input"
        placeholder="Search artists, artworks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-btn" aria-label="Search">
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;