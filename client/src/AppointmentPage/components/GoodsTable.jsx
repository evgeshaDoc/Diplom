import React, { useContext, useEffect, useState } from 'react';
import 'materialize-css';
import TableContent from './TableContent';
import '../styles/add-button.css';
import { InputContext } from '../InputContext';
import GoodsModal from './GoodsModal';

const GoodsTable = () => {
  const [test, setTest] = useState(0);
  const { form } = useContext(InputContext);

  useEffect(() => {
    console.log(form.cart.length);
    setTest((prevState) => prevState + 1);
  }, [form]);

  // if (!form.cart.lenght)
  //   return (
  //     <div className='row'>
  //       <h5>Расходников не добавлено</h5>
  //       <GoodsModal />
  //     </div>
  //   );

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
          {form.cart.map((item) => (
            <TableContent key={item._id} item={item} />
          ))}
        </tbody>
      </table>

      <GoodsModal />
    </>
  );
};

export default GoodsTable;
