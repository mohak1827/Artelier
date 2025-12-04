import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import '../../sections/user/Profile.css'; 

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateUserState } = useAuth();
  
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const { items, total, clearCart } = location.state || {};

  useEffect(() => {
    if (!items || !total) {
      navigate('/gallery'); 
      return;
    }

    const amount = total.replace(/[^0-9.]/g, '');
    const upiId = "8295190177@ybl";
    const payeeName = "Artelier Gallery";
    
    const upiString = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR`;
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiString)}`;
    
    setQrCodeUrl(qrApiUrl);
  }, [items, total, navigate]);

  const handlePaymentSuccess = async () => {
    if (!transactionId.trim()) {
      setError("Please enter the Transaction ID / UTR Number to proceed.");
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const { data } = await api.post('/user/orders/create', {
        items: items,
        total: total,
        transactionId: transactionId,
        clearCart: clearCart 
      });

      if (data.success) {
        updateUserState({ 
          orders: data.orders, 
          cart: data.cart 
        });
        
        alert("Payment Recorded! Order Placed Successfully.");
        navigate('/orders');
      }
    } catch (err) {
      console.error(err);
      setError("Failed to record payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!items) return null;

  return (
    <div className="profile-dashboard">
      <main className="profile-content" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', gridColumn: '1 / -1' }}>
        <div className="welcome-banner" style={{ padding: '1.5rem' }}>
          <h2>Complete Your Payment</h2>
        </div>

        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <h3>Total Amount: {total}</h3>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>Scan with any UPI App (GPay, PhonePe, Paytm)</p>

          {qrCodeUrl ? (
            <img src={qrCodeUrl} alt="Payment QR Code" style={{ width: '250px', marginBottom: '1.5rem', border: '1px solid #eee', borderRadius: '8px' }} />
          ) : (
            <p>Generating QR...</p>
          )}

          <div className="payment-summary" style={{ textAlign: 'left', background: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Order Summary:</h4>
            {items.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                <span>{item.title}</span>
                <span>{item.price}</span>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <label style={{ fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Enter Transaction ID / UTR:</label>
            <input 
              type="text" 
              placeholder="e.g., 123456789012"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                fontSize: '1rem'
              }}
            />
            {error && <p style={{ color: '#ef4444', fontSize: '0.9rem', marginTop: '0.5rem' }}>{error}</p>}
          </div>

          <button 
            onClick={handlePaymentSuccess} 
            className="primary-btn" 
            style={{ width: '100%' }}
            disabled={isProcessing}
          >
            {isProcessing ? 'Verifying...' : 'Confirm Payment'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;