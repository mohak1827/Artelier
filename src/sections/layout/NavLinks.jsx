import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavLinks.css';

const NavLinks = ({ isMobileMenuOpen, closeMobileMenu }) => {
  
  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'gallery', label: 'Gallery', href: '/gallery' },
    { id: 'artists', label: 'Artists', href: '/artists' }, 
    { id: 'auctions', label: 'Auctions', href: '/auctions' }
  ];

  const handleNavClick = () => {
    if (closeMobileMenu) {
      closeMobileMenu();
    }
  };

  return (
    <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      {navItems.map((item) => (
        <NavLink
          key={item.id}
          to={item.href}
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          onClick={handleNavClick}
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;