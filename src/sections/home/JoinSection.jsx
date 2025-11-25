import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './JoinSection.css';

const JoinSection = () => {
  const { openModal } = useAuth();

  const handleJoinClick = () => {
    openModal(); 
  };

  return (
    <div className="join-section">
      <div className="join-container">
        <div className="join-card">
          <h3>Join Our Community</h3>
          <p>
            Connect with artists and collectors worldwide. Start your art journey today 
            and discover extraordinary pieces that speak to you.
          </p>
          <button className="join-btn" onClick={handleJoinClick}>
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinSection;