import React, { useState } from 'react';

const SidebarOrderBy = () => {
  const [select, setSelect] = useState('');
  return (
    <div className='select-container'>
      <span>Соритровать</span>
      <select value={select} onChange={(e) => setSelect(e.target.value)}>
        <option value='0' defaultValue disabled>
          Выберите вариант
        </option>
        <option value='1'>По алфавиту (по возр.)</option>
        <option value='2'>По алфавиту (по убыв.)</option>
        <option value='3'>По цене (по возр.)</option>
        <option value='4'>По цене (по убыв.)</option>
      </select>
    </div>
  );
};

export default SidebarOrderBy;
