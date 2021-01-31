import React, { useEffect, useState } from 'react';
import 'materialize-css';

const TableContent = ({ item }) => {
  const [count, setCount] = useState('');
  const [price, setPrice] = useState('');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      currency: 'rub',
      style: 'currency',
    }).format(price);
  };

  useEffect(() => {
    setCount(`${item.count}`);
    setPrice(`${item.price * item.count}`);
  }, [item]);

  useEffect(() => {
    setPrice(`${count * item.price}`);
  }, [count, item]);

  return (
    <>
      <tr>
        <td>{item.name}</td>
        <td>
          <input
            value={count}
            className='browser-default'
            onChange={(e) => setCount(e.target.value)}
            style={{ width: '25px', textAlign: 'center' }}
          />
        </td>
        <td>{formatPrice(price)}</td>
      </tr>
    </>
  );
};

export default TableContent;
