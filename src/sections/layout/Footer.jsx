import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    explore: {
      title: "Explore",
      links: [
        { text: "Gallery", to: "/gallery" },
        { text: "Artists Directory", to: "/artists" },
        { text: "Artworks", to: "/gallery" },
        { text: "Collections", to: "/gallery" }
      ]
    },
    artists: {
      title: "Artists",
      links: [
        { text: "Featured Artists", to: "/artists" },
        { text: "Become an Artist", to: "/about-artists" },
        { text: "Artist Resources", to: "/about-artists" },
        { text: "Artist Guidelines", to: "/about-artists" }
      ]
    },
    auctions: {
      title: "Auctions",
      links: [
        { text: "Live Auctions", to: "/auctions/live" },
        { text: "Upcoming Auctions", to: "/auctions/upcoming" },
        { text: "Recent Auctions", to: "/auctions/recent" },
        { text: "How Auctions Work", to: "/how-auctions-work" }
      ]
    },
    about: {
      title: "About Us",
      links: [
        { text: "About Artelier", to: "/about" },
        { text: "Contact Us", to: "/contact" },
        { text: "Our Mission", to: "/about" },
        { text: "Careers", to: "/about" }
      ]
    },
    help: {
      title: "Help & Support",
      links: [
        { text: "FAQ", to: "/faq" },
        { text: "Terms & Conditions", to: "/terms" },
        { text: "Privacy Policy", to: "/privacy" },
        { text: "Refund & Cancellation", to: "/refund-policy" }
      ]
    }
  };

  const socialLinks = [
    { name: "Instagram", icon: "", url: "https://instagram.com" },
    { name: "Facebook", icon: "", url: "https://facebook.com" },
    { name: "Twitter", icon: "", url: "https://twitter.com" },
    { name: "Pinterest", icon: "", url: "https://pinterest.com" }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Top - Brand & Newsletter */}
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-icon"></span>
              <span className="footer-logo-text">Artelier</span>
            </Link>
            <p className="footer-tagline">
              Connecting visionary artists with passionate collectors worldwide.
            </p>
          </div>
          
          <div className="footer-newsletter">
            <h3>Stay Inspired</h3>
            <p>Subscribe to our newsletter for exclusive art drops and auction alerts.</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-button">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="footer-links-grid">
          {Object.values(footerSections).map((section, index) => (
            <div key={index} className="footer-column">
              <h4 className="footer-column-title">{section.title}</h4>
              <ul className="footer-links-list">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link to={link.to} className="footer-link">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom - Social & Copyright */}
        <div className="footer-bottom">
          <div className="footer-social">
            <span className="footer-social-title">Follow Us</span>
            <div className="footer-social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={social.name}
                  title={social.name}
                >
                  <span className="footer-social-icon">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div className="footer-copyright">
            <p>&copy; {currentYear} Artelier. All rights reserved.</p>
            <p className="footer-copyright-tagline">
              Empowering artists. Inspiring collectors.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;