import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import NavLinks from './NavLinks';
import SearchBar from './SearchBar'; 
import './Navbar.css';

const Navbar = () => {
  const { user, openModal } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="navbar-container">
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/" className="navbar-logo-link">
            <span className="navbar-logo-text">Artelier</span>
          </Link>
        </div>

        <div className="navbar-search-desktop">
           <SearchBar />
        </div>
        
        <div className="navbar-links">
          <NavLinks isMobileMenuOpen={isMobileMenuOpen} closeMobileMenu={closeMobileMenu} />
          <div className="navbar-profile-container">
            {user ? (
              <Link 
                to="/profile"
                className="profile-icon-link" 
                aria-label="Go to Profile"
              >
                <div className="nav-avatar-placeholder">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </Link>
            ) : (
              <button
                type="button"
                className="profile-icon-link profile-icon-button"
                aria-label="Open login dialog"
                onClick={openModal}
              >
                <span className="icon-user">👤</span>
              </button>
            )}
          </div>
        </div>

        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </nav>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-search">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Navbar;