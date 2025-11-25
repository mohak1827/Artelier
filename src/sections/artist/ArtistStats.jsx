import React from 'react';
import './ArtistStats.css';
import { FaFire } from 'react-icons/fa';

const ArtistStats = ({ stats }) => {
  return (
    <div className="stats-container">
      {stats.map((stat, index) => (
        <div className="stat-item" key={index}>
          <span className="stat-value">
            {index === 0 && <FaFire className="stat-icon" />}
            {stat.value}
          </span>
          <span className="stat-label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ArtistStats;