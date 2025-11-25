import React from 'react';
import { useAuth } from '../../contexts/AuthContext'; 
import HeroCarousel from './HeroCarousel';
import FeaturesGrid from './FeaturesGrid';
import ArtworkGallery from './ArtworkGallery';
import ArtistGallery from '../artist/ArtistGallery';
import AuctionGallery from '../auction/AuctionGallery';
import RecentSales from './RecentSales';
import JoinSection from './JoinSection';
import './HomePage.css';


const HomePage = () => {

  const { user, openModal } = useAuth();

  return (
    <div className="homepage">
      
      <HeroCarousel />

      <FeaturesGrid />

      <ArtworkGallery
        currentUser={user}
        onOpenAuthModal={openModal}
      />

      <ArtistGallery />

      <AuctionGallery />
      <RecentSales />

      {!user && (
        <JoinSection onOpenAuthModal={openModal} />
      )}
    </div>
  );
};

export default HomePage;