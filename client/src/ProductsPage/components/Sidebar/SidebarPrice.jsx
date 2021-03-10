import React, { useContext, useState } from 'react';
import { ProductsContext } from '../../ProductsContext';
import '../../styles/sidebar.css';

const SidebarPrice = () => {
  // const [fromPrice, setFromPrice] = useState('');
  // const [toPrice, setToPrice] = useState('');
  const { filters, changeFilters } = useContext(ProductsContext);

  return (
    <div className='price-container'>
      <span className='price-text'>Цена</span>
      <div className='input-container'>
        <input
          name='priceMin'
          type='number'
          pattern='[0-9]'
          style={{ width: '40%' }}
          placeholder='от'
          value={filters.priceMin}
          onChange={changeFilters}
        />
        <span> - </span>
        <input
          name='priceMax'
          type='number'
          pattern='[0-9]'
          style={{ width: '40%' }}
          placeholder='до'
          value={filters.priceMax}
          onChange={changeFilters}
        />
      </div>
    </div>
  );
};

export default SidebarPrice;
