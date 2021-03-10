import React, { useContext, useEffect, useState } from 'react';
import 'materialize-css';
import { InputContext } from '../InputContext';

const TableContent = ({ item }) => {
  const { cartCountChange } = useContext(InputContext);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      currency: 'rub',
      style: 'currency',
    }).format(price);
  };

  return (
    <>
      <tr>
        <td>{item.name}</td>
        <td>
          <input
            name={`${item._id}`}
            value={`${item.count}`}
            className='browser-default'
            onChange={(e) => {
              cartCountChange(e, item);
            }}
            style={{ width: '25px', textAlign: 'center' }}
          />
        </td>
        <td>{formatPrice(item.sum)}</td>
      </tr>
    </>
  );
};

export default TableContent;
