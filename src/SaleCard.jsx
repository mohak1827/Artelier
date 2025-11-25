import React from 'react';
import './SaleCard.css';

const SaleCard = ({ sale }) => {
  const handleClick = () => {
    console.log('View sale details:', sale.id);
  };

  return (
    <div className="deal-item" onClick={handleClick}>
      <img src={sale.image} alt={sale.artwork} />
      <div className="deal-content">
        <div className="deal-artwork">"{sale.artwork}"</div>
        <div className="deal-price">Sold for {sale.price}</div>
        <div className="deal-date">{sale.date}</div>
        <div className="deal-winner">Won by: {sale.winner}</div>
      </div>
    </div>
  );
};

export default SaleCard;