import React from 'react';
import './StaticPages.css';

const TermsPage = () => {
  return (
    <div className="static-page">
      <div className="static-hero">
        <h1>Terms & Conditions</h1>
        <p>Please read these terms carefully before using Artelier</p>
      </div>

      <div className="static-content">
        <section className="content-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Artelier, you accept and agree to be bound by the terms and provisions 
            of this agreement. If you do not agree to these terms, please do not use our platform.
          </p>
        </section>

        <section className="content-section">
          <h2>2. Use of Platform</h2>
          <p>
            Artelier provides an online marketplace for artists to showcase and sell their artwork. You agree to:
          </p>
          <ul>
            <li>Provide accurate and complete information when creating an account</li>
            <li>Maintain the security of your account credentials</li>
            <li>Not use the platform for any illegal or unauthorized purpose</li>
            <li>Not interfere with or disrupt the platform's functionality</li>
            <li>Respect intellectual property rights of artists and other users</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>3. Artist Responsibilities</h2>
          <p>
            Artists using Artelier to sell their work agree to:
          </p>
          <ul>
            <li>Own or have rights to all artwork they upload</li>
            <li>Provide accurate descriptions and images of their artwork</li>
            <li>Honor all sales made through the platform</li>
            <li>Ship artwork within the agreed timeframe</li>
            <li>Maintain professional communication with buyers</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>4. Buyer Responsibilities</h2>
          <p>
            Buyers agree to:
          </p>
          <ul>
            <li>Provide accurate shipping and payment information</li>
            <li>Complete payment for purchased artwork</li>
            <li>Review return policies before making purchases</li>
            <li>Contact support for any issues or concerns</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>5. Payments and Fees</h2>
          <p>
            All transactions are processed securely through our payment partners. Artelier charges a 15% 
            commission on all artwork sales. Artists receive their payment within 7-10 business days after 
            the buyer confirms receipt of the artwork.
          </p>
        </section>

        <section className="content-section">
          <h2>6. Intellectual Property</h2>
          <p>
            All content on Artelier, including artwork, text, graphics, and logos, is protected by copyright 
            and intellectual property laws. Artists retain ownership of their artwork but grant Artelier 
            permission to display and promote their work on the platform.
          </p>
        </section>

        <section className="content-section">
          <h2>7. Limitation of Liability</h2>
          <p>
            Artelier acts as a marketplace platform connecting artists and buyers. We are not responsible for:
          </p>
          <ul>
            <li>Quality, condition, or authenticity of artwork (beyond our verification process)</li>
            <li>Disputes between artists and buyers</li>
            <li>Shipping delays or damages (covered by shipping insurance)</li>
            <li>Loss of data or service interruptions</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>8. Termination</h2>
          <p>
            We reserve the right to suspend or terminate accounts that violate these terms or engage in 
            fraudulent activity. Users may also close their accounts at any time by contacting support.
          </p>
        </section>

        <section className="content-section">
          <h2>9. Changes to Terms</h2>
          <p>
            Artelier reserves the right to modify these terms at any time. We will notify users of significant 
            changes via email. Continued use of the platform after changes constitutes acceptance of new terms.
          </p>
        </section>

        <section className="content-section">
          <h2>10. Contact Information</h2>
          <p>
            For questions about these terms, please contact us at legal@artelier.com or visit our Contact page.
          </p>
        </section>

        <section className="content-section">
          <p style={{ fontStyle: 'italic', color: '#9A9A9A', fontSize: '14px' }}>
            Last Updated: January 2025
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
