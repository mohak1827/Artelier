import React from 'react';
import { Link } from 'react-router-dom';
import './StaticPages.css';

const AboutPage = () => {
  return (
    <div className="static-page">
      <div className="static-hero">
        <h1>About Artelier</h1>
        <p>Connecting visionary artists with passionate collectors worldwide</p>
      </div>

      <div className="static-content">
        <section className="content-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2024, Artelier was born from a simple yet powerful vision: to create a platform where 
            art transcends boundaries and connects creators with collectors across the globe. We believe that 
            every piece of art tells a story, and every artist deserves a stage to share their vision.
          </p>
          <p>
            What started as a small online gallery has grown into a thriving community of thousands of artists 
            and art enthusiasts. Today, Artelier stands as a testament to the power of creativity and the 
            universal language of art.
          </p>
        </section>

        <section className="content-section">
          <h2>Our Mission</h2>
          <p>
            At Artelier, we're on a mission to democratize the art world. We provide artists with the tools 
            and platform they need to showcase their work, while offering collectors access to unique, 
            high-quality artworks from around the world.
          </p>
          <div className="mission-grid">
            <div className="mission-card">
              <span className="mission-icon">🎨</span>
              <h3>Empower Artists</h3>
              <p>Give creators the platform and resources to thrive</p>
            </div>
            <div className="mission-card">
              <span className="mission-icon">🌍</span>
              <h3>Global Reach</h3>
              <p>Connect art lovers across continents and cultures</p>
            </div>
            <div className="mission-card">
              <span className="mission-icon">✨</span>
              <h3>Quality First</h3>
              <p>Curate exceptional artworks that inspire and captivate</p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2>Why Choose Artelier?</h2>
          <div className="features-list">
            <div className="feature-item">
              <h3>🔒 Secure Transactions</h3>
              <p>Your purchases are protected with industry-leading security measures</p>
            </div>
            <div className="feature-item">
              <h3>🎯 Curated Collection</h3>
              <p>Every artwork is carefully selected by our expert team</p>
            </div>
            <div className="feature-item">
              <h3>📦 Worldwide Shipping</h3>
              <p>We deliver art safely to your doorstep, anywhere in the world</p>
            </div>
            <div className="feature-item">
              <h3>💬 Artist Direct</h3>
              <p>Connect directly with artists and learn their stories</p>
            </div>
          </div>
        </section>

        <section className="content-section cta-section">
          <h2>Join Our Community</h2>
          <p>Whether you're an artist looking to showcase your work or a collector seeking unique pieces, Artelier is your home.</p>
          <div className="cta-buttons">
            <Link to="/artists" className="cta-btn primary">Browse Artists</Link>
            <Link to="/gallery" className="cta-btn secondary">Explore Gallery</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
