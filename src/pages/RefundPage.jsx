import React from 'react';
import './StaticPages.css';

const RefundPage = () => {
  return (
    <div className="static-page">
      <div className="static-hero">
        <h1>Refund & Cancellation Policy</h1>
        <p>Understanding our return and refund process</p>
      </div>

      <div className="static-content">
        <section className="content-section">
          <h2>1. Order Cancellation</h2>
          <p>
            <strong>Before Shipment:</strong> You can cancel your order anytime before it ships. Full refund 
            will be processed within 5-7 business days.
          </p>
          <p>
            <strong>After Shipment:</strong> Once an order has shipped, it cannot be cancelled. However, you 
            may return the artwork following our return policy below.
          </p>
          <p>
            To cancel an order, go to your Orders page and click "Cancel Order" or contact support@artelier.com
          </p>
        </section>

        <section className="content-section">
          <h2>2. Return Policy</h2>
          <p>
            We want you to love your artwork! If you're not satisfied, you can return it within 7 days of delivery.
          </p>
          <h3>Eligible Returns:</h3>
          <ul>
            <li>Artwork significantly different from description or images</li>
            <li>Damaged or defective artwork (not caused by shipping)</li>
            <li>Wrong artwork delivered</li>
            <li>Quality issues not disclosed in listing</li>
          </ul>
          <h3>Non-Eligible Returns:</h3>
          <ul>
            <li>Custom or commissioned artwork</li>
            <li>Artwork damaged due to improper handling after delivery</li>
            <li>Change of mind after 7 days</li>
            <li>Digital artwork downloads</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>3. Return Process</h2>
          <p>
            To initiate a return:
          </p>
          <ol>
            <li>Contact support@artelier.com within 7 days of delivery</li>
            <li>Provide order number and reason for return</li>
            <li>Include photos if artwork is damaged or defective</li>
            <li>Wait for return authorization and shipping instructions</li>
            <li>Pack artwork securely in original packaging</li>
            <li>Ship to provided return address with tracking</li>
          </ol>
          <p>
            <strong>Important:</strong> Do not ship returns without authorization. Unauthorized returns will 
            not be accepted.
          </p>
        </section>

        <section className="content-section">
          <h2>4. Refund Process</h2>
          <p>
            Once we receive and inspect the returned artwork:
          </p>
          <ul>
            <li><strong>Inspection:</strong> 2-3 business days to verify condition</li>
            <li><strong>Approval:</strong> Email notification of refund approval</li>
            <li><strong>Processing:</strong> 5-7 business days for refund to appear</li>
            <li><strong>Method:</strong> Refund issued to original payment method</li>
          </ul>
          <p>
            <strong>Refund Amount:</strong> Full artwork price minus return shipping costs (unless artwork 
            was damaged/defective, in which case full refund including shipping).
          </p>
        </section>

        <section className="content-section">
          <h2>5. Damaged During Shipping</h2>
          <p>
            If artwork arrives damaged:
          </p>
          <ul>
            <li>Take photos of packaging and artwork immediately</li>
            <li>Contact us within 48 hours of delivery</li>
            <li>Do not discard packaging materials</li>
            <li>We will file a claim with shipping carrier</li>
            <li>Full refund or replacement at your choice</li>
          </ul>
          <p>
            All shipments are insured. Shipping damage claims are processed within 10-14 business days.
          </p>
        </section>

        <section className="content-section">
          <h2>6. Auction Purchases</h2>
          <p>
            <strong>Special Rules for Auction Items:</strong>
          </p>
          <ul>
            <li>All auction sales are final once bidding closes</li>
            <li>No cancellations or returns except for damaged/defective items</li>
            <li>Winning bidders must complete payment within 48 hours</li>
            <li>Failure to pay may result in account suspension</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>7. Partial Refunds</h2>
          <p>
            Partial refunds may be issued in cases where:
          </p>
          <ul>
            <li>Minor damage that doesn't affect artwork significantly</li>
            <li>Artwork returned not in original condition</li>
            <li>Missing accessories or packaging</li>
            <li>Return initiated after 7-day window (at our discretion)</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>8. Restocking Fees</h2>
          <p>
            We do not charge restocking fees for eligible returns. However, return shipping costs are the 
            buyer's responsibility unless the return is due to our error or damaged/defective artwork.
          </p>
        </section>

        <section className="content-section">
          <h2>9. Exchange Policy</h2>
          <p>
            We do not offer direct exchanges. If you'd like a different artwork:
          </p>
          <ol>
            <li>Return the original artwork following our return process</li>
            <li>Receive your refund</li>
            <li>Place a new order for the desired artwork</li>
          </ol>
        </section>

        <section className="content-section">
          <h2>10. Contact for Returns</h2>
          <p>
            For all return and refund inquiries:
          </p>
          <p>
            <strong>Email:</strong> returns@artelier.com<br />
            <strong>Phone:</strong> +91 (800) 123-4567<br />
            <strong>Hours:</strong> Monday-Friday, 9 AM - 6 PM IST
          </p>
        </section>

        <section className="content-section cta-section">
          <h2>Need Help?</h2>
          <p>Our support team is here to assist with any return or refund questions.</p>
          <div className="cta-buttons">
            <a href="/contact" className="cta-btn primary">Contact Support</a>
            <a href="/faq" className="cta-btn secondary">View FAQ</a>
          </div>
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

export default RefundPage;
