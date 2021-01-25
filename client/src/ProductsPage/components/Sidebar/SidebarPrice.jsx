import React, { useState } from 'react';
import '../../styles/sidebar.css';

const SidebarPrice = () => {
  const [fromPrice, setFromPrice] = useState('');
  const [toPrice, setToPrice] = useState('');

  return (
    <div className='price-container'>
      <span className='price-text'>Цена</span>
      <div className='input-container'>
        <input
          style={{ width: '40%' }}
          placeholder='от'
          value={fromPrice}
          onChange={(e) => setFromPrice(e.target.value)}
        />
        <span> - </span>
        <input
          style={{ width: '40%' }}
          placeholder='до'
          value={toPrice}
          onChange={(e) => setToPrice(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SidebarPrice;
