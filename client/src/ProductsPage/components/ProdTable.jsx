import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/table.css';
import { InputContext } from '../../AppointmentPage/InputContext';

const products = [
  {
    id: 1,
    name: 'Opalescence BOOST PF набор',
    article: 'UL4751',
    price: 5210,
    remains: 50,
    picture:
      'https://www.dentlman.ru/upload/resize_cache/iblock/55d/670_370_075511db9cefbc414a902a46f1b8fae16/55d0f02b1c18b793586c81d284426a97.jpg',
    category: 'Средства для отбеливания зубов',
  },
  {
    id: 2,
    name: 'Opalescence PF 10% Patient Kit Reg, 8 шпр.',
    article: 'UL5366',
    price: 4949,
    remains: 21,
    picture:
      'https://www.dentlman.ru/upload/resize_cache/iblock/88e/670_370_075511db9cefbc414a902a46f1b8fae16/88e8b058d1f59d33535eee295a44b15e.jpg',
    category: 'Средства для отбеливания зубов',
  },
  {
    id: 3,
    name: 'Маски защитные, трехслойные, 50 шт',
    article: '217118',
    price: 230,
    remains: 5,
    picture:
      'https://stomdevice.ru/images/thumbnails/800/684/detailed/46/eaeec2af1d42343f04696ce2ae5752c2_4n2k-ci.jpeg',
    category: 'Средства для отбеливания зубов',
  },
];

const ProdTable = ({ modal }) => {
  const [prods, setProds] = useState([]);
  const history = useHistory();
  const { addToCart } = useContext(InputContext);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      currency: 'rub',
      style: 'currency',
    }).format(price);
  };

  const handleClick = (e, id) => {
    const cellText = document.getSelection();
    if (cellText.type === 'Range') return e.stopPropagation();

    history.push(`/product/${id}`);
  };

  useEffect(() => {
    setProds(products);
  }, []);

  return (
    <table className='highlight'>
      <thead>
        <tr>
          <th></th>
          <th>Наименование</th>
          <th>Артикул</th>
          <th>Остаток</th>
          <th>Цена</th>
        </tr>
      </thead>
      <tbody>
        {prods.map((item) => (
          <tr
            key={item.id}
            onClick={
              modal ? () => addToCart(item) : (e) => handleClick(e, item.id)
            }
          >
            <td className='table-image-container'>
              <img src={item.picture} alt='Нет фото' className='table-image' />
            </td>
            <td>{item.name}</td>
            <td>{item.article}</td>
            <td>{item.remains}</td>
            <td>{formatPrice(item.price)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProdTable;
