import React, { useState } from 'react';

const SidebarCategory = () => {
  const [select, setSelect] = useState('');
  return (
    <div className='select-container'>
      <span>Категории</span>
      <select value={select} onChange={(e) => setSelect(e.target.value)}>
        <option value='0' selected disabled>
          Выберите вариант
        </option>
        <option value='1'>Услуги</option>
        <option value='2'>Хирургия</option>
        <option value='3'>Ортодонтия</option>
        <option value='4'>Пародонтия</option>
        <option value='5'>Детская стоматология</option>
        <option value='6'>Ортопедия</option>
      </select>
    </div>
  );
};

export default SidebarCategory;