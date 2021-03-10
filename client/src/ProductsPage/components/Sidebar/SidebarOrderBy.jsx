import React, { useContext, useState } from 'react';
import { ProductsContext } from '../../ProductsContext';

const SidebarOrderBy = () => {
  const [select, setSelect] = useState('');
  const { filters, changeFilters } = useContext(ProductsContext);
  return (
    <div className='select-container'>
      <span>Соритровать</span>
      <select name='orderBy' value={filters.oderBy} onChange={changeFilters}>
        <option value='name'>По имени (А-Я)</option>
        <option value='-name'>По имени (Я-А)</option>
        <option value='price'>По цене (по возр.)</option>
        <option value='-price'>По цене (по убыв.)</option>
      </select>
    </div>
  );
};

export default SidebarOrderBy;
