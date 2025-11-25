import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import './Profile.css'; 

const Orders = () => {
  const { user } = useAuth();

 
  if (!user.orders || user.orders.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2 style={{ marginBottom: '1rem', color: '#1a202c' }}>No orders yet.</h2>
        <p style={{ color: '#718096', marginBottom: '2rem' }}>
          Your collection awaits! Start browsing to find your next masterpiece.
        </p>
        <Link to="/gallery" className="primary-btn">Start Collecting</Link>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1 style={{ marginBottom: '2rem', fontSize: '1.8rem', color: '#1a202c' }}>Order History</h1>
      
      <div className="orders-list" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {user.orders.map((order) => (
          <div key={order.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            
            
            <div style={{ background: '#f8f9fa', padding: '1.2rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div>
                <span style={{ color: '#718096', fontSize: '0.8rem', display: 'block', marginBottom: '0.2rem', fontWeight: '600', letterSpacing: '0.5px' }}>ORDER PLACED</span>
                <span style={{ fontWeight: '600', color: '#2d3748' }}>{new Date(order.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div>
                <span style={{ color: '#718096', fontSize: '0.8rem', display: 'block', marginBottom: '0.2rem', fontWeight: '600', letterSpacing: '0.5px' }}>TOTAL</span>
                <span style={{ fontWeight: '600', color: '#2d3748' }}>{order.total}</span>
              </div>
              <div>
                <span style={{ color: '#718096', fontSize: '0.8rem', display: 'block', marginBottom: '0.2rem', fontWeight: '600', letterSpacing: '0.5px' }}>ORDER #</span>
                <span style={{ fontWeight: '600', color: '#2d3748' }}>{order.id.slice(-8).toUpperCase()}</span>
              </div>
              
              {order.transactionId && (
                <div>
                  <span style={{ color: '#718096', fontSize: '0.8rem', display: 'block', marginBottom: '0.2rem', fontWeight: '600', letterSpacing: '0.5px' }}>TXN ID</span>
                  <span style={{ fontWeight: '600', color: '#2563eb', fontFamily: 'monospace', background: '#eff6ff', padding: '2px 6px', borderRadius: '4px' }}>
                    {order.transactionId}
                  </span>
                </div>
              )}
            </div>

            <div style={{ padding: "1.5rem" }}>
  <div
    style={{
      marginBottom: "1rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    }}
  >
  
    <span
      style={{
        height: "10px",
        width: "10px",
        borderRadius: "50%",
       
        background: order.status === "Paid" ? "#28a745" : "#b9101bff",
        display: "inline-block",
      }}
    ></span>

    
    <h4
      style={{
        margin: 0,
        
        color: order.status === "Paid" ? "#28a745" : "#b91010ff",
        fontSize: "0.95rem",
        fontWeight: "600",
      }}
    >
      {order.status || "Paid"}
    </h4>
  </div>


              {order.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1.5rem', marginBottom: idx === order.items.length - 1 ? 0 : '1.5rem', borderBottom: idx === order.items.length - 1 ? 'none' : '1px solid #f1f5f9', paddingBottom: idx === order.items.length - 1 ? 0 : '1.5rem' }}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    style={{ 
                      width: '80px', 
                      height: '80px', 
                      objectFit: 'cover', 
                      borderRadius: '8px',
                      border: '1px solid #edf2f7' 
                    }} 
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.25rem', color: '#2d3748' }}>{item.title}</h3>
                    <p style={{ color: '#718096', margin: 0, fontSize: '0.9rem' }}>Artist: {item.artistName}</p>
                    <p style={{ fontWeight: '700', marginTop: '0.5rem', color: '#2d3748' }}>{item.price}</p>
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                    <Link to={`/artwork/${item.artworkId}`} style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>
                      View Artwork
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;