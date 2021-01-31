import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../mocks/products';
import './styles.css';

const ProductPage = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      currency: 'rub',
      style: 'currency',
    }).format(price);
  };

  useEffect(() => {
    setProduct(products[id - 1]);
  }, [id]);

  return (
    <>
      <div className='container'>
        <div className='main-container'>
          <div className='line'>
            <div className='img-container'>
              <img
                src={product.picture}
                alt='Нет фото'
                className='responsive-img'
              />
            </div>
            <div className='main-line'>
              <span
                style={{ fontSize: 26, fontWeight: 'bold', marginRight: 80 }}
              >
                {product.name}
              </span>
              <span style={{ fontSize: 26, fontWeight: 600 }}>
                {formatPrice(product.price)}
              </span>
            </div>
          </div>
          <div className='more-container'>
            <span style={{ fontSize: 18, fontWeight: 500 }}>
              Остаток: {product.remains}
            </span>
            <div>
              <span style={{ fontSize: 16, fontWeight: 600 }}>Описание:</span>
              <br />
              <span>{product.description}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
