import React, { useContext, useEffect, useState } from 'react';
import 'materialize-css';
import { Button } from 'react-materialize';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

const ProductsPage = () => {
  const [name, setName] = useState('');
  const [products, setProducts] = useState([]);
  const { token } = useContext();
  const { request, loading, errors, clearErrors } = useHttp();
  const message = useMessage();

  const handleSearch = async (e) => {
    setName(e.target.value);
    const data = await request(
      '/api/products/search',
      'get',
      { name },
      `Authorization: Bearer ${token}`
    );

    if (errors) return message(errors);

    setProducts(data.products);
  };

  const initLoad = async () => {
    const data = await request(
      '/api/products/',
      'get',
      null,
      `Authorization: Bearer ${token}`
    );

    if (errors) return message(errors);

    setProducts(data.products);
  };

  useEffect(() => {
    clearErrors();
  }, [errors, clearErrors]);

  useEffect(() => {
    initLoad();
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col s6 m3'>
          <button title='Фильтры' />
        </div>
        <div className='col s6 m3'>
          <div className='input-field'>
            <label htmlFor='name'>Email</label>
            <input
              name='name'
              id='name'
              type='text'
              value={name}
              autoCorrect={false}
              autoCapitalize={false}
              autoComplete={false}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
      {products.map((product) => (
        <ProductComponent product={product} />
      ))}
    </div>
  );
};
