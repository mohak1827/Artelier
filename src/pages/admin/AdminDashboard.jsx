import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import '../../sections/user/Profile.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/admin/orders');
        if (data.success) setOrders(data.orders);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.isAdmin) fetchOrders();
  }, [user]);

  const handleStatusUpdate = async (userId, orderId, newStatus) => {
    if (!window.confirm(`Mark this order as ${newStatus}?`)) return;

    try {
      const { data } = await api.put('/admin/order/status', { userId, orderId, status: newStatus });
      if (data.success) {
        setOrders(prev => prev.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        ));
      }
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (!user?.isAdmin) return <div style={{padding:'3rem', textAlign:'center'}}>Access Denied</div>;
  if (loading) return <div style={{padding:'3rem', textAlign:'center'}}>Loading Admin Panel...</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ color: '#1a202c', marginBottom: '2rem' }}>Admin Order Verification</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {orders.map(order => (
          <div key={order.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
              <div>
                <h3 style={{ margin: 0 }}>{order.customerName}</h3>
                <span style={{ color: '#718096', fontSize: '0.9rem' }}>{order.customerEmail}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{order.total}</div>
                <div style={{ 
                  display: 'inline-block', 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  fontSize: '0.8rem', 
                  fontWeight: '600',
                  background: order.status === 'Paid' ? '#def7ec' : order.status === 'Rejected' ? '#fde8e8' : '#fef3c7',
                  color: order.status === 'Paid' ? '#03543f' : order.status === 'Rejected' ? '#9b1c1c' : '#92400e'
                }}>
                  {order.status}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1rem', background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600', color: '#4a5568' }}>Transaction ID / UTR:</p>
              <p style={{ margin: 0, fontFamily: 'monospace', fontSize: '1.1rem', color: '#2563eb' }}>
                {order.transactionId || "N/A"}
              </p>
            </div>

            {order.status === 'Pending Verification' && (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  onClick={() => handleStatusUpdate(order.userId, order.id, 'Paid')}
                  style={{ flex: 1, padding: '10px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
                >
                  Approve Payment
                </button>
                <button 
                  onClick={() => handleStatusUpdate(order.userId, order.id, 'Rejected')}
                  style={{ flex: 1, padding: '10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;