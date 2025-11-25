import React from 'react';
import SaleCard from '../../SaleCard';
import './RecentSales.css';

const RecentSales = () => {
  const recentSales = [
    { 
      id: 1, 
      artwork: "Midnight Dreams", 
      price: "$1,250", 
      date: "February 28, 2025", 
      winner: "ArtCollector92", 
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
      id: 2, 
      artwork: "Urban Pulse", 
      price: "$890", 
      date: "February 25, 2025", 
      winner: "ModernArtFan", 
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
      id: 3, 
      artwork: "Ocean Whispers", 
      price: "$2,100", 
      date: "February 22, 2025", 
      winner: "SeaLover_Art", 
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
      id: 4, 
      artwork: "Golden Sunset", 
      price: "$750", 
      date: "February 18, 2025", 
      winner: "NatureLover123", 
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
      id: 5, 
      artwork: "Midnight Dreams", 
      price: "$1,250", 
      date: "February 28, 2025", 
      winner: "ArtCollector92", 
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
      id: 6, 
      artwork: "Urban Pulse", 
      price: "$890", 
      date: "February 25, 2025", 
      winner: "ModernArtFan", 
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
      id: 7, 
      artwork: "Ocean Whispers", 
      price: "$2,100", 
      date: "February 22, 2025", 
      winner: "SeaLover_Art", 
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
      id: 8, 
      artwork: "Golden Sunset", 
      price: "$750", 
      date: "February 18, 2025", 
      winner: "NatureLover123", 
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    }
  ];

  return (
    <div className="gallery-showcase-horizontal">
      <h2 className="gallery-title-horizontal">Recent Successful Auctions</h2>
      <div className="art-scroll-container">
        <div className="art-horizontal-scroll">
          {recentSales.map((sale) => (
            <SaleCard key={sale.id} sale={sale} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentSales;