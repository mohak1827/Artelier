import React from 'react';
import './StaticPages.css';

const PrivacyPage = () => {
  return (
    <div className="static-page">
      <div className="static-hero">
        <h1>Privacy Policy</h1>
        <p>Your privacy is important to us</p>
      </div>

      <div className="static-content">
        <section className="content-section">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information to provide better services to our users. This includes:
          </p>
          <ul>
            <li><strong>Account Information:</strong> Name, email address, password (encrypted)</li>
            <li><strong>Profile Information:</strong> Profile picture, bio, location (optional)</li>
            <li><strong>Payment Information:</strong> Processed securely through third-party payment providers</li>
            <li><strong>Usage Data:</strong> Pages visited, artworks viewed, search queries</li>
            <li><strong>Device Information:</strong> Browser type, IP address, device type</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>2. How We Use Your Information</h2>
          <p>
            We use the collected information to:
          </p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Process transactions and send order confirmations</li>
            <li>Personalize your experience and show relevant artwork</li>
            <li>Send important updates about your account or orders</li>
            <li>Improve our platform based on user behavior</li>
            <li>Detect and prevent fraud or security issues</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>3. Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share information with:
          </p>
          <ul>
            <li><strong>Artists:</strong> When you purchase artwork, artists receive your shipping information</li>
            <li><strong>Service Providers:</strong> Payment processors, shipping companies, email services</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>4. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your data:
          </p>
          <ul>
            <li>SSL encryption for all data transmission</li>
            <li>Secure password hashing (bcrypt)</li>
            <li>Regular security audits and updates</li>
            <li>Limited employee access to personal data</li>
            <li>Secure data centers with backup systems</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>5. Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies to:
          </p>
          <ul>
            <li>Keep you logged in to your account</li>
            <li>Remember your preferences</li>
            <li>Analyze site traffic and usage patterns</li>
            <li>Provide personalized recommendations</li>
          </ul>
          <p>
            You can control cookies through your browser settings, but some features may not work properly 
            if cookies are disabled.
          </p>
        </section>

        <section className="content-section">
          <h2>6. Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li><strong>Access:</strong> Request a copy of your personal data</li>
            <li><strong>Correction:</strong> Update or correct your information</li>
            <li><strong>Deletion:</strong> Request deletion of your account and data</li>
            <li><strong>Opt-out:</strong> Unsubscribe from marketing emails</li>
            <li><strong>Data Portability:</strong> Request your data in a portable format</li>
          </ul>
          <p>
            To exercise these rights, contact us at privacy@artelier.com
          </p>
        </section>

        <section className="content-section">
          <h2>7. Children's Privacy</h2>
          <p>
            Artelier is not intended for users under 13 years of age. We do not knowingly collect information 
            from children. If you believe we have collected data from a child, please contact us immediately.
          </p>
        </section>

        <section className="content-section">
          <h2>8. International Users</h2>
          <p>
            Artelier is based in India. If you access our platform from outside India, your information may 
            be transferred to and processed in India. By using Artelier, you consent to this transfer.
          </p>
        </section>

        <section className="content-section">
          <h2>9. Changes to Privacy Policy</h2>
          <p>
            We may update this privacy policy periodically. We will notify you of significant changes via 
            email or a notice on our platform. Your continued use after changes indicates acceptance.
          </p>
        </section>

        <section className="content-section">
          <h2>10. Contact Us</h2>
          <p>
            For privacy-related questions or concerns, contact us at:
          </p>
          <p>
            <strong>Email:</strong> privacy@artelier.com<br />
            <strong>Address:</strong> Mumbai, Maharashtra, India
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

export default PrivacyPage;
