export const liveAuctions = [
  {
    id: 'live-1',
    title: 'Ethereal Dreams',
    artist: 'Elena Petrova',
    artistId: 'a4',
    image: 'https://lesliepaints.wordpress.com/wp-content/uploads/2009/10/racehorse3.jpg',
    currentBid: 45000,
    startingBid: 30000,
    bidCount: 23,
    endTime: new Date(Date.now() + 2 * 60 * 1000),
    category: 'Painting',
    description: 'A stunning abstract piece that captures the essence of dreams and imagination.',
    size: '48 × 36 in',
    year: 2024
  },
  {
    id: 'live-2',
    title: 'Urban Symphony',
    artist: 'Marco Rossi',
    artistId: 'a3',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2MOR-rNtp3_pfSq6PVxVhuk42OeBZ9ld03g&s',
    currentBid: 32000,
    startingBid: 25000,
    bidCount: 18,
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    category: 'Painting',
    description: 'A vibrant depiction of city life with bold colors and dynamic composition.',
    size: '60 × 40 in',
    year: 2024
  },
  {
    id: 'live-3',
    title: 'Marble Elegance',
    artist: 'Elena Petrova',
    artistId: 'a4',
    image: 'https://images.saatchiart.com/saatchi/1675669/art/12545955/11608145-LJYMDVXM-7.jpg',
    currentBid: 85000,
    startingBid: 60000,
    bidCount: 31,
    endTime: new Date(Date.now() + 8 * 60 * 60 * 1000),
    category: 'Sculpture',
    description: 'Exquisite marble sculpture showcasing classical beauty with modern interpretation.',
    size: '24 × 18 × 12 in',
    year: 2024
  }
];

export const upcomingAuctions = [
  {
    id: 'upcoming-1',
    title: 'Digital Horizons',
    artist: 'Kenji Tanaka',
    artistId: 'a5',
    image: 'https://m.media-amazon.com/images/I/71aSfryYZmS._AC_UF894,1000_QL80_.jpg',
    startingBid: 20000,
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    category: 'Digital Art',
    description: 'A mesmerizing digital artwork exploring the boundaries of virtual reality.',
    size: 'Digital (4K)',
    year: 2024
  },
  {
    id: 'upcoming-2',
    title: 'Golden Sunset',
    artist: 'Arjun Singh',
    artistId: 'a1',
    image: 'https://urartstudio.com/wp-content/uploads/2023/12/waterfall.png',
    startingBid: 15000,
    startTime: new Date(Date.now() + 48 * 60 * 60 * 1000),
    category: 'Photography',
    description: 'Breathtaking landscape photography capturing the perfect golden hour.',
    size: '40 × 30 in',
    year: 2024
  },
  {
    id: 'upcoming-3',
    title: 'Abstract Emotions',
    artist: 'Clara Oswald',
    artistId: 'a2',
    image: 'https://cdn.shopify.com/s/files/1/0632/4840/0639/files/20_Acrylic_Painting_Ideas_to_Try_On_Your_Next_Project_1.jpg?v=1695659421',
    startingBid: 35000,
    startTime: new Date(Date.now() + 72 * 60 * 60 * 1000),
    category: 'Painting',
    description: 'Bold abstract painting expressing raw human emotions through color and form.',
    size: '54 × 42 in',
    year: 2024
  },
  {
    id: 'upcoming-4',
    title: 'Steel Dreams',
    artist: 'Marco Rossi',
    artistId: 'a3',
    image: 'https://cdn.shopify.com/s/files/1/0603/3745/5243/files/21._Nature_water_colour_painting_of_a_sunrise_over_misty_hills.jpg?v=1678077995',
    startingBid: 50000,
    startTime: new Date(Date.now() + 96 * 60 * 60 * 1000),
    category: 'Sculpture',
    description: 'Contemporary steel sculpture representing industrial beauty and strength.',
    size: '36 × 24 × 20 in',
    year: 2024
  }
];

export const recentAuctions = [
  {
    id: 'recent-1',
    title: 'Crimson Flow',
    artist: 'Elena Petrova',
    artistId: 'a4',
    image: 'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    finalBid: 52000,
    startingBid: 35000,
    winner: 'Rajesh Kumar',
    endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    category: 'Painting',
    bidCount: 28
  },
  {
    id: 'recent-2',
    title: 'Zen Garden',
    artist: 'Kenji Tanaka',
    artistId: 'a5',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3BVUL7lvE76whWIwGEidgZfEz9ZNhoOYZQA&s',
    finalBid: 38000,
    startingBid: 25000,
    winner: 'Priya Sharma',
    endDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    category: 'Painting',
    bidCount: 19
  },
  {
    id: 'recent-3',
    title: 'Ocean Depths',
    artist: 'Clara Oswald',
    artistId: 'a2',
    image: 'https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    finalBid: 41000,
    startingBid: 30000,
    winner: 'Amit Patel',
    endDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    category: 'Painting',
    bidCount: 22
  },
  {
    id: 'recent-4',
    title: 'Bronze Form',
    artist: 'Arjun Singh',
    artistId: 'a1',
    image: 'https://www.artzolo.com/cdn/shop/files/untitled-272-asif-sharief-shaikh.jpg?v=1733464172',
    finalBid: 68000,
    startingBid: 45000,
    winner: 'Sneha Reddy',
    endDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    category: 'Sculpture',
    bidCount: 35
  },
  {
    id: 'recent-5',
    title: 'City Lights',
    artist: 'Arjun Singh',
    artistId: 'a1',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    finalBid: 28000,
    startingBid: 18000,
    winner: 'Vikram Singh',
    endDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
    category: 'Photography',
    bidCount: 16
  },
  {
    id: 'recent-6',
    title: 'Abstract Symphony',
    artist: 'Arjun Singh',
    artistId: 'a1',
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    finalBid: 55000,
    startingBid: 40000,
    winner: 'Ananya Gupta',
    endDate: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
    category: 'Painting',
    bidCount: 31
  }
];

export const getTimeRemaining = (endTime) => {
  const total = Date.parse(endTime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds
  };
};

export const getTimeUntilStart = (startTime) => {
  const total = Date.parse(startTime) - Date.parse(new Date());
  const hours = Math.floor(total / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `Starts in ${days} day${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `Starts in ${hours} hour${hours > 1 ? 's' : ''}`;
  } else {
    return 'Starting soon';
  }
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
