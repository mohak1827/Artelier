import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './Profile.css';

const Cart = () => {
  const { user, updateUserState } = useAuth();
  const navigate = useNavigate();

  const handleRemove = async (id) => {
    try {
      const { data } = await api.delete(`/user/cart/remove/${id}`);
      if (data.success) {
        updateUserState({ cart: data.cart });
      }
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const handleCheckout = () => {
    if (!user.cart || user.cart.length === 0) return;

    const totalNum = user.cart.reduce((acc, item) => {
      const priceNumber = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
      return acc + priceNumber;
    }, 0);

    const totalString = `$${totalNum.toLocaleString()}`;

    navigate('/payment', {
      state: {
        items: user.cart,
        total: totalString,
        clearCart: true 
      }
    });
  };

  if (!user.cart || user.cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2 style={{ marginBottom: '1rem', color: '#1a202c' }}>Your cart is empty.</h2>
        <p style={{ color: '#718096', marginBottom: '2rem' }}>
          Continue exploring artworks and make one yours!
        </p>
        <Link to="/gallery" className="primary-btn">
          Explore Artworks
        </Link>
      </div>
    );
  }

  const totalDisplay = user.cart.reduce((acc, item) => {
    const priceNumber = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    return acc + priceNumber;
  }, 0);

  return (
    <div className="cart-container">
      <h1 style={{ marginBottom: '1.5rem', fontSize: '1.8rem', color: '#1a202c' }}>
        Your Cart ({user.cart.length})
      </h1>

      <div className="cart-list" style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {user.cart.map((item, idx) => (
          <div 
            key={idx} 
            className="cart-item" 
            style={{
              display: 'flex', 
              gap: '1.5rem', 
              padding: '1.5rem', 
              borderBottom: idx === user.cart.length - 1 ? 'none' : '1px solid #edf2f7',
              alignItems: 'center'
            }}
          >
            <img 
              src={item.image} 
              alt={item.title} 
              style={{
                width: '100px', 
                height: '100px', 
                objectFit: 'cover', 
                borderRadius: '8px',
                border: '1px solid #edf2f7'
              }} 
            />

            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.5rem', color: '#2d3748' }}>
                {item.title}
              </h3>
              <p style={{ color: '#718096', margin: 0, fontSize: '0.95rem' }}>
                Artist: {item.artistName}
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <p style={{ fontWeight: '700', fontSize: '1.2rem', marginBottom: '0.5rem', color: '#2d3748' }}>
                {item.price}
              </p>
              <button 
                onClick={() => handleRemove(item.artworkId)} 
                style={{
                  color: '#ef4444', 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  fontSize: '0.9rem', 
                  textDecoration: 'underline',
                  padding: 0
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary" style={{ marginTop: '2.5rem', textAlign: 'right' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
          <span style={{ color: '#718096', fontSize: '1.1rem' }}>Subtotal:</span>
          <h2 style={{ fontSize: '2rem', margin: 0, color: '#1a202c' }}>
            ${totalDisplay.toLocaleString()}
          </h2>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <Link 
            to="/gallery" 
            style={{
              padding: '0.8rem 2rem',
              borderRadius: '30px',
              textDecoration: 'none',
              color: '#4a5568',
              background: '#f7fafc',
              fontWeight: '600'
            }}
          >
            Continue Shopping
          </Link>
          <button 
            onClick={handleCheckout} 
            className="primary-btn"
            style={{ margin: 0 }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;