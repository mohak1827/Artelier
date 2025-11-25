import React, { useState } from 'react';
import './StaticPages.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="static-page">
      <div className="static-hero">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Send us a message!</p>
      </div>

      <div className="static-content">
        <section className="content-section">
          <h2>Get in Touch</h2>
          <p>
            Have questions about our platform, need assistance with an order, or want to learn more about 
            becoming an artist on Artelier? We're here to help!
          </p>

          <div className="contact-info-grid">
            <div className="contact-info-card">
              <span className="contact-icon">📧</span>
              <h3>Email</h3>
              <p>support@artelier.com</p>
            </div>
            <div className="contact-info-card">
              <span className="contact-icon">📞</span>
              <h3>Phone</h3>
              <p>+91 (800) 123-4567</p>
            </div>
            <div className="contact-info-card">
              <span className="contact-icon">📍</span>
              <h3>Address</h3>
              <p>Mumbai, Maharashtra, India</p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2>Send Us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What is this about?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell us more..."
              />
            </div>

            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
