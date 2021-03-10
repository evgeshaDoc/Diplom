import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';
import { useHttp } from '../hooks/http.hook';
import { MainContext } from '../App';
import { useMessage } from '../hooks/message.hook';

const ProductPage = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const { request, loading } = useHttp();
  const message = useMessage();
  const { token } = useContext(MainContext);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      currency: 'rub',
      style: 'currency',
    }).format(price);
  };

  const handleLoad = useCallback(async () => {
    try {
      const data = await request(`/api/products/${id}`, 'get', null, {
        Authorization: `Bearer ${token}`,
      });
      if (data.message) return message(data.message);
      console.log(data.product);
      setProduct(data.product);
    } catch (e) {}
  }, [request, message, id, token]);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

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
              {/* <span>{product.description}</span> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ProductPage);
