import React from 'react';
import './StaticPages.css';

const FAQPage = () => {
  const faqs = [
    {
      question: "How do I purchase artwork on Artelier?",
      answer: "Browse our gallery, select the artwork you love, and click 'Buy Now' or 'Add to Cart'. You'll be guided through a secure checkout process. We accept all major payment methods including credit cards, debit cards, and UPI."
    },
    {
      question: "Is my payment information secure?",
      answer: "Absolutely! We use industry-standard encryption and secure payment gateways to protect your financial information. Your payment details are never stored on our servers."
    },
    {
      question: "How long does shipping take?",
      answer: "Domestic shipping typically takes 5-7 business days. International shipping can take 10-15 business days depending on your location. All artworks are carefully packaged to ensure safe delivery."
    },
    {
      question: "Can I return or exchange artwork?",
      answer: "Yes! We offer a 7-day return policy for most artworks. If you're not satisfied with your purchase, contact our support team within 7 days of delivery. Please refer to our Refund & Cancellation policy for complete details."
    },
    {
      question: "How do I become an artist on Artelier?",
      answer: "We're always looking for talented artists! Click on 'Become an Artist' in the footer or profile page to submit your application. Our team reviews all applications and will contact you within 5-7 business days."
    },
    {
      question: "What commission does Artelier charge artists?",
      answer: "Artelier charges a competitive 15% commission on all sales. This covers platform maintenance, payment processing, marketing, and customer support. Artists receive 85% of the sale price directly."
    },
    {
      question: "How do auctions work on Artelier?",
      answer: "Auctions allow you to bid on exclusive artworks. Place your bid before the timer runs out. The highest bidder when the auction ends wins the artwork. You'll be notified immediately if you win."
    },
    {
      question: "Can I save artworks to view later?",
      answer: "Yes! Click the heart icon on any artwork to add it to your wishlist. You can access your saved items anytime from your profile. You can also follow your favorite artists to stay updated on their new works."
    },
    {
      question: "What if I have an issue with my order?",
      answer: "Contact our support team at support@artelier.com or use the contact form. We're here to help resolve any issues quickly. Our support team typically responds within 24 hours."
    },
    {
      question: "Do you offer certificates of authenticity?",
      answer: "Yes! Every artwork purchased through Artelier comes with a digital certificate of authenticity signed by the artist. This certificate includes details about the artwork, artist, and purchase date."
    }
  ];

  return (
    <div className="static-page">
      <div className="static-hero">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about Artelier</p>
      </div>

      <div className="static-content">
        <section className="content-section">
          <h2>Common Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="content-section cta-section">
          <h2>Still Have Questions?</h2>
          <p>Can't find what you're looking for? Our support team is here to help!</p>
          <div className="cta-buttons">
            <a href="/contact" className="cta-btn primary">Contact Support</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FAQPage;
