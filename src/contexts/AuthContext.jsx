import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // --- MODAL STATE ---
  // This is the "Global Switch" for the login popup
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Check Session on Load (Hit /me endpoint)
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const { data } = await api.get('/auth/me');
        if (data.success) {
          setUser(data.user);
        }
      } catch (err) {
        setUser(null); // Not logged in
      } finally {
        setLoading(false);
      }
    };
    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      if (data.success) setUser(data.user);
      // RETURN THE USER OBJECT HERE so the modal knows if they are admin
      return { success: true, user: data.user }; 
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Login failed' };
    }
  };

  const loginAdmin = async (email, password) => {
    try {
      const { data } = await api.post('/auth/admin/login', { email, password });
      if (data.success) setUser(data.user);
      return { success: true, user: data.user }; 
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Admin login failed' };
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;

      // Get Firebase ID token for backend verification
      const idToken = await fbUser.getIdToken();

      // Send token to MERN backend to create/find user and set JWT cookie
      const { data } = await api.post('/auth/google', { idToken });

      if (data.success && data.user) {
        setUser(data.user);

        // Only ask for a password when this is a NEW Google signup, not
        // on every Google login.
        if (data.isNewUser) {
          try {
            const newPassword = window.prompt('Welcome to Artelier! Set a password for your account (optional). Leave blank to skip.');
            if (newPassword && newPassword.length >= 6) {
              const resp = await api.post('/auth/setPassword', { password: newPassword });
              if (resp.data?.success && resp.data.user) {
                setUser(resp.data.user);
              }
            }
          } catch (e) {
            // Ignore errors from optional password setting
          }
        }

        return { success: true, user: data.user };
      }

      return { success: false, error: data.message || 'Google login failed' };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message || 'Google login failed' };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const { data } = await api.post('/auth/signup', { name, email, password });
      if (data.success) setUser(data.user);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Signup failed' };
    }
  };

  const logout = async () => {
    try {
      await api.get('/auth/logout');
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  // --- USER ACTIONS ---
  // These update the global user state immediately so UI reflects changes
  const updateUserState = (newData) => {
    setUser(prev => ({ ...prev, ...newData }));
  };

  return (
    <AuthContext.Provider value={{ 
      user, login, loginAdmin, signup, logout, loginWithGoogle, loading, 
      isModalOpen, openModal, closeModal,
      updateUserState
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);