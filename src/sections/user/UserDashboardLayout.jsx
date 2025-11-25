import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Profile.css';

const UserDashboardLayout = () => {
  const { user, openModal, loading } = useAuth();

  if (loading) {
    return (
      <div className="profile-dashboard" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-login-prompt">
        <div className="login-prompt-card">
          <h1>Join the Artelier Community</h1>
          <p>Log in to view your profile, manage orders, and save your favorite art.</p>
          <button onClick={openModal} className="primary-btn">Login / Signup</button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-dashboard">
      <main className="profile-content">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboardLayout;