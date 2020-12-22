import React from 'react';

const ProductComponent = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      currency: 'rub',
      style: 'currency',
    }).format(price);
  };

  return (
    <>
      <div className='row'>
        {product.image ? (
          <div className='col s3 l3 center-align valign-wrapper'>
            <img src={product.image} />
          </div>
        ) : (
          <div className='col s3 l3 center-align valign-wrapper'></div>
        )}
        <div className='col s3 l3 center-align valign-wrapper'>
          {product.name}
        </div>
        <div className='col s3 l2 center-align valign-wrapper'>
          {product.article || '-'}
        </div>
        <div className='col s2 l2 center-align valign-wrapper'>
          {product.remains}
        </div>
        <div className='col s2 l2 center-align valign-wrapper'>
          {product.price}
        </div>
      </div>
    </>
  );
};
