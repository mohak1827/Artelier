import React from 'react';
import AuctionCard from './AuctionCard';
import './AuctionGallery.css';

const AuctionGallery = () => {
  const upcomingAuctions = [
    { 
      id: 1, 
      title: "Contemporary Masters", 
      date: "March 15, 2025", 
      description: "Featuring works from emerging contemporary artists. Expected bidding starts from $200.", 
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
      id: 2, 
      title: "Digital Art Showcase", 
      date: "March 22, 2025", 
      description: "Revolutionary digital artworks and NFTs from top creators worldwide.and NFTs", 
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
      id: 3, 
      title: "Abstract Expressions", 
      date: "March 28, 2025", 
      description: "Bold abstract pieces that challenge conventional artistic boundaries.that challenge", 
      image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
      id: 4, 
      title: "Local Talent Night", 
      date: "April 5, 2025", 
      description: "Celebrating regional artists with affordable starting bids from $50.artists with", 
      image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
      id: 5, 
      title: "Contemporary Masters", 
      date: "March 15, 2025", 
      description: "Featuring works from emerging contemporary artists. Expected bidding starts from $200.", 
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
      id: 6, 
      title: "Digital Art Showcase", 
      date: "March 22, 2025", 
      description: "Revolutionary digital artworks and NFTs from top creators worldwide.and NFTs ", 
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
      id: 7, 
      title: "Abstract Expressions", 
      date: "March 28, 2025", 
      description: "Bold abstract pieces that challenge conventional artistic boundaries.that challenge", 
      image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
      id: 8, 
      title: "Local Talent Night", 
      date: "April 5, 2025", 
      description: "Celebrating regional artists with affordable starting bids from $50.rtists with", 
      image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    }
  ];

  return (
    <div className="gallery-showcase-horizontal">
      <h2 className="gallery-title-horizontal">Upcoming Live Auctions</h2>
      <div className="art-scroll-container">
        <div className="art-horizontal-scroll">
          {upcomingAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuctionGallery;