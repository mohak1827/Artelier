import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

export const UserProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div style={{ padding: '3rem', textAlign: 'center' }}>Loading...</div>;
  
  if (!user) return <Navigate to="/" replace />;
  
  if (user.isAdmin === true) return <Navigate to="/admin" replace />;
  
  return children;
};

export const AdminProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div style={{ padding: '3rem', textAlign: 'center' }}>Loading...</div>;
  
  if (!user) return <Navigate to="/" replace />;
  
  if (user.isAdmin !== true) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: '3rem', textAlign: 'center' }}>Loading...</div>;
  if (!user) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;