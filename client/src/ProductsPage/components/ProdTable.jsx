import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/table.css';
import { InputContext } from '../../AppointmentPage/InputContext';
import { ProductsContext } from '../ProductsContext';

const ProdTable = (modal) => {
  const history = useHistory();
  const { addToCart } = useContext(InputContext);
  const { products } = useContext(ProductsContext);

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
        {products.map((item) => (
          <tr
            key={item._id}
            onClick={
              modal ? () => addToCart(item) : (e) => handleClick(e, item._id)
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

export default React.memo(ProdTable);
