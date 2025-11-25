import React, { useState } from 'react';
import './ArtistBiography.css';

const ArtistBiography = ({ biography }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const charLimit = 350;
  const isLongText = biography.length > charLimit;
  
  const displayText = isLongText && !isExpanded 
    ? `${biography.substring(0, charLimit)}...` 
    : biography;

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bio-container">
      <h2 className="bio-title">Biography</h2>
      <p className="bio-text">
        {displayText}
      </p>
      {isLongText && (
        <button onClick={toggleReadMore} className="read-more-btn">
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

export default ArtistBiography;