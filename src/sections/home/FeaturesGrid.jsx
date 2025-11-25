import React from 'react';
import FeatureCard from './FeatureCard';
import './FeaturesGrid.css';

const FeaturesGrid = () => {
  const features = [
    {
      icon: '🔥',
      title: 'Live Auctions',
      description: 'Bid live on exclusive pieces with instant updates and countdown timers.',
      link: '#auctions'
    },
    {
      icon: '🎨',
      title: 'Dynamic Gallery',
      description: 'Filter artworks by medium, price, or artist, and see new uploads instantly.',
      link: '#gallery'
    },
    {
      icon: '🔒',
      title: 'Secure Payments',
      description: 'Enjoy safe transactions and clear receipts for every purchase.',
      link: '#payments'
    },
    {
      icon: '📊',
      title: 'Artist Dashboard',
      description: 'Manage your portfolio, set auction details, and view your sales history.',
      link: '#dashboard'
    },
    {
      icon: '💰',
      title: 'Start Selling',
      description: 'List your artworks, set starting prices, and reach a global audience.',
      link: '#selling'
    },
    {
      icon: '🔔',
      title: 'Smart Notifications',
      description: 'Stay updated with in-app and email alerts for bids, sales, and favorites.',
      link: '#notifications'
    },
    {
      icon: '✨',
      title: 'Curated Collections',
      description: 'Explore handpicked selections of trending and timeless works, updated weekly.',
      link: '#collections'
    },
    {
      icon: '❤️',
      title: 'Community Picks',
      description: 'See what artworks are winning hearts in our vibrant collector community.',
      link: '#community'
    }
  ];

  return (
    <div className="features-fullwidth">
      <div className="features-grid">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </div>
    </div>
  );
};

export default FeaturesGrid;