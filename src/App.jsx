import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import { NotificationProvider } from './contexts/NotificationContext';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import AuthModal from './sections/auth/AuthModal';
import Navbar from './sections/layout/Navbar';
import Footer from './sections/layout/Footer';
import UserDashboardLayout from './sections/user/UserDashboardLayout';
import AdminLayout from './pages/admin/AdminLayout';
import { UserProtectedRoute, AdminProtectedRoute } from './ProtectedRoute';

import HomePage from './sections/home/HomePage';
import ArtworkDetailPage from './pages/artwork/ArtworkDetailPage';
import AuctionPage from './sections/auction/AuctionPage';
import AuctionItemPage from './sections/auction/AuctionItemPage';
import ArtistPage from './pages/artist/ArtistPage';
import GalleryPage from './sections/gallery/GalleryPage';
import ArtistsDirectory from './pages/artist/ArtistsDirectory';

import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import RefundPage from './pages/RefundPage';

import Profile from './sections/user/Profile';
import Cart from './sections/user/Cart';
import Wishlist from './sections/user/Wishlist';
import FavArtists from './sections/user/FavArtists';
import Orders from './sections/user/Orders'; 
import PaymentPage from './pages/payment/PaymentPage'; 
import AdminDashboard from './pages/admin/AdminDashboard';

import './App.css';

const LayoutWithNavbar = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};


const GlobalAuthModal = () => {
  const { isModalOpen, closeModal } = useAuth();
  return <AuthModal isOpen={isModalOpen} onClose={closeModal} />;
};


const AutoRedirect = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (!loading && user) {
      const currentPath = window.location.pathname;
      
      if (user.isAdmin === true && currentPath === '/') {
        navigate('/admin', { replace: true });
      }
      else if (user.isAdmin !== true && currentPath.startsWith('/admin')) {
        navigate('/', { replace: true });
      }
    }
  }, [user, loading, navigate]);
  
  return null;
};

const App = () => {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <NotificationProvider>
          <Router>
            <div className="app">
            
          
            <AutoRedirect />
          
          <Routes>
           
            <Route element={<LayoutWithNavbar />}>
              
              <Route path="/" element={<HomePage />} />
              <Route path="/artwork/:id" element={<ArtworkDetailPage />} />
              
              <Route path="/artist/:id" element={<ArtistPage />} />
              <Route path="/artists" element={<ArtistsDirectory />} />

              <Route path="/auctions" element={<AuctionPage />} />

              <Route path="/auction/:id" element={<AuctionItemPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/refund-policy" element={<RefundPage />} />
              
              <Route path="/payment" element={
                <UserProtectedRoute>
                  <PaymentPage />
                </UserProtectedRoute>
              } />

              <Route element={
                <UserProtectedRoute>
                  <UserDashboardLayout />
                </UserProtectedRoute>
              }>
                <Route path="/profile" element={<Profile />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/fav-artists" element={<FavArtists />} />
                <Route path="/orders" element={<Orders />} />
              </Route>
            </Route>

            <Route element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>

            <GlobalAuthModal />

          </div>
          </Router>
        </NotificationProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
};

export default App;