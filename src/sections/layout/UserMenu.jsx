import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './UserMenu.css';

const UserMenu = ({ onOpenAuthModal }) => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  if (!user) {
    return <a href="#" className="login-link" onClick={(e) => { e.preventDefault(); onOpenAuthModal(); }}>Login</a>;
  }

  return (
    <div className="user-display active" onClick={() => setShowDropdown(!showDropdown)}>
      <span className="user-name">{user.name}</span>
      {showDropdown && (
        <div className="dropdown-menu show">
          <button className="dropdown-item" onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};
export default UserMenu;