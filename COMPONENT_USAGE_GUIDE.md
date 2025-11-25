# Component Usage Guide - Quick Reference

## 🎨 Theme System

### Importing the Theme
```javascript
import theme from './theme';

// Access colors
const goldColor = theme.colors.metallicGold; // #D4AF37

// Access spacing
const largePadding = theme.spacing.lg; // 1.5rem (24px)

// Access shadows
const cardShadow = theme.shadows.md;

// Access transitions
const smoothTransition = theme.transitions.base; // 300ms ease-in-out
```

### Using CSS Variables
```css
.my-component {
  color: var(--color-metallic-gold);
  font-family: var(--font-heading);
  transition: var(--transition-base);
  box-shadow: var(--shadow-md);
}
```

---

## 🖼️ ArtworkCard Component

### Basic Usage
```jsx
import ArtworkCard from './components/ArtworkCard';

<ArtworkCard
  id="artwork-123"
  image="https://example.com/artwork.jpg"
  title="Sunset Dreams"
  artistName="Arjun Singh"
  price="₹45,000"
  category="Abstract"
/>
```

### With Favorites
```jsx
const [favorites, setFavorites] = useState([]);

const handleFavorite = (artworkId) => {
  setFavorites(prev => 
    prev.includes(artworkId)
      ? prev.filter(id => id !== artworkId)
      : [...prev, artworkId]
  );
};

<ArtworkCard
  id="artwork-123"
  image="https://example.com/artwork.jpg"
  title="Sunset Dreams"
  artistName="Arjun Singh"
  price="₹45,000"
  category="Abstract"
  onFavorite={handleFavorite}
  isFavorited={favorites.includes("artwork-123")}
  showFavorite={true}
/>
```

### In a Grid Layout
```jsx
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '2rem',
  padding: '2rem'
}}>
  {artworks.map(artwork => (
    <ArtworkCard
      key={artwork.id}
      id={artwork.id}
      image={artwork.image}
      title={artwork.title}
      artistName={artwork.artistName}
      price={artwork.price}
      category={artwork.category}
      onFavorite={handleFavorite}
      isFavorited={favorites.includes(artwork.id)}
    />
  ))}
</div>
```

---

## 👤 ArtistCard Component

### Basic Usage
```jsx
import ArtistCard from './components/ArtistCard';

<ArtistCard
  id="arjun-singh"
  name="Arjun Singh"
  image="https://example.com/artist.jpg"
  specialty="Contemporary Abstract"
  artworkCount={18}
  country="India"
/>
```

### With Placeholder (No Image)
```jsx
<ArtistCard
  id="jane-doe"
  name="Jane Doe"
  // No image prop - will show initial "J"
  specialty="Modern Sculpture"
  artworkCount={12}
  country="USA"
/>
```

### With Favorites
```jsx
const [favoriteArtists, setFavoriteArtists] = useState([]);

const handleFavoriteArtist = (artistId) => {
  setFavoriteArtists(prev => 
    prev.includes(artistId)
      ? prev.filter(id => id !== artistId)
      : [...prev, artistId]
  );
};

<ArtistCard
  id="arjun-singh"
  name="Arjun Singh"
  image="https://example.com/artist.jpg"
  specialty="Contemporary Abstract"
  artworkCount={18}
  country="India"
  onFavorite={handleFavoriteArtist}
  isFavorited={favoriteArtists.includes("arjun-singh")}
  showFavorite={true}
/>
```

### In a Grid Layout
```jsx
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '2.5rem',
  padding: '2rem'
}}>
  {artists.map(artist => (
    <ArtistCard
      key={artist.id}
      id={artist.id}
      name={artist.name}
      image={artist.image}
      specialty={artist.specialty}
      artworkCount={artist.artworkCount}
      country={artist.country}
      onFavorite={handleFavoriteArtist}
      isFavorited={favoriteArtists.includes(artist.id)}
    />
  ))}
</div>
```

---

## 🧭 Navbar

### Already Integrated
The Navbar is automatically included on all pages via `LayoutWithNavbar` in `App.jsx`.

### Customization
If you need to customize the Navbar for specific pages:

```jsx
// In your page component
import { useAuth } from './AuthContext';

const MyPage = () => {
  const { user, openModal } = useAuth();
  
  // The navbar will automatically show user state
  // Call openModal() to open login dialog
  
  return (
    <div>
      {/* Your page content */}
    </div>
  );
};
```

---

## 🦶 Footer

### Already Integrated
The Footer is automatically included on all pages via `LayoutWithNavbar` in `App.jsx`.

### Adding New Footer Links
Edit `src/Footer.jsx`:

```jsx
const footerSections = {
  // ... existing sections
  
  newSection: {
    title: "New Section",
    links: [
      { text: "Link 1", to: "/link-1" },
      { text: "Link 2", to: "/link-2" }
    ]
  }
};
```

---

## 🎭 Common Patterns

### Page with Cards Grid
```jsx
import React, { useState } from 'react';
import ArtworkCard from './components/ArtworkCard';
import './MyPage.css';

const MyPage = () => {
  const [artworks] = useState([
    {
      id: '1',
      image: '/images/artwork1.jpg',
      title: 'Artwork 1',
      artistName: 'Artist 1',
      price: '₹10,000',
      category: 'Abstract'
    },
    // ... more artworks
  ]);

  return (
    <div className="my-page">
      <header className="page-header">
        <h1>My Gallery</h1>
        <p>Explore beautiful artworks</p>
      </header>
      
      <div className="artworks-grid">
        {artworks.map(artwork => (
          <ArtworkCard key={artwork.id} {...artwork} />
        ))}
      </div>
    </div>
  );
};

export default MyPage;
```

### Corresponding CSS
```css
.my-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  color: #171717;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #D4AF37 0%, #C9A961 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-header p {
  font-size: 18px;
  color: #6B6B6B;
}

.artworks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .my-page {
    padding: 2rem 1rem;
  }
  
  .page-header h1 {
    font-size: 36px;
  }
  
  .artworks-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
```

---

## 🎨 Styling Best Practices

### 1. Use Theme Colors
```css
/* ✅ Good */
.my-element {
  color: #D4AF37; /* Metallic Gold from theme */
  background: #F5F2EB; /* Canvas Beige from theme */
}

/* ❌ Avoid */
.my-element {
  color: #FFD700; /* Random gold not in theme */
  background: #F0F0F0; /* Random grey not in theme */
}
```

### 2. Consistent Spacing
```css
/* ✅ Good - Use 8px multiples */
.my-element {
  padding: 1rem; /* 16px */
  margin: 2rem; /* 32px */
  gap: 1.5rem; /* 24px */
}

/* ❌ Avoid */
.my-element {
  padding: 13px; /* Odd number */
  margin: 27px; /* Not a multiple of 8 */
}
```

### 3. Smooth Transitions
```css
/* ✅ Good */
.my-button {
  transition: all 0.3s ease;
}

.my-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
}

/* ❌ Avoid */
.my-button {
  transition: all 0.1s linear; /* Too fast, not smooth */
}
```

### 4. Typography Hierarchy
```css
/* ✅ Good */
.page-title {
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  font-weight: 700;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-weight: 600;
}

.body-text {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
}
```

---

## 🔧 Troubleshooting

### Cards Not Displaying Correctly
1. Check that images have valid URLs
2. Ensure parent container has proper grid/flex layout
3. Verify all required props are passed

### Hover Effects Not Working
1. Check that CSS files are imported
2. Verify browser supports CSS transitions
3. Clear browser cache

### Favorites Not Persisting
1. Implement backend API endpoints
2. Store favorites in user profile
3. Sync state with backend on mount

### Responsive Issues
1. Test at breakpoints: 640px, 768px, 1024px, 1280px
2. Use browser DevTools responsive mode
3. Check grid column counts at each breakpoint

---

## 📚 Additional Resources

- **Theme Reference:** `src/theme.js`
- **Phase 1 Summary:** `PHASE_1_SUMMARY.md`
- **Progress Tracker:** `REDESIGN_PROGRESS.md`
- **Component Files:**
  - `src/components/ArtworkCard.jsx` + `.css`
  - `src/components/ArtistCard.jsx` + `.css`
  - `src/Navbar.jsx` + `.css`
  - `src/Footer.jsx` + `.css`

---

**Happy Coding! 🎨✨**

