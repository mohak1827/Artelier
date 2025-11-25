import React from 'react';
import { FaTrophy } from 'react-icons/fa';
import './ArtistAwards.css';

const ArtistAwards = ({ awards }) => {
  if (!awards || awards.length === 0) {

    return null; 
  }

  return (
    <div className="awards-container">
      <h2 className="awards-title">Awards & Recognitions</h2>
      <ul className="awards-list">
        {awards.map((award, index) => (
          <li key={index} className="award-item">
            <span className="award-icon"><FaTrophy /></span>
            <div className="award-details">
              <span className="award-name">{award.name}</span>
              <span className="award-issuer">{award.issuer}, {award.year}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistAwards;