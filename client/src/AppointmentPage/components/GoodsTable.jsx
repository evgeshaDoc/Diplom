import React, { useContext, useEffect, useState } from 'react';
import 'materialize-css';
import TableContent from './TableContent';
import '../styles/add-button.css';
import { InputContext } from '../InputContext';
import GoodsModal from './GoodsModal';

const GoodsTable = () => {
  const [goods, setGoods] = useState([]);
  const { form } = useContext(InputContext);

  useEffect(() => {
    setGoods(form.cart);
  }, [setGoods, form.cart]);

  if (goods.length === 0)
    return (
      <div className='row'>
        <h5>Расходников не добавлено</h5>
        <button className='btn btn-small blue darken-2'>Добавить</button>
      </div>
    );

  return (
    <>
      <table className='highlight responsive-table'>
        <thead>
          <tr>
            <th>Наименование</th>
            <th>Кол-во</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
          {goods.map((item) => (
            <TableContent key={item.id} item={item} />
          ))}
        </tbody>
      </table>

      <GoodsModal />
    </>
  );
};

export default GoodsTable;
