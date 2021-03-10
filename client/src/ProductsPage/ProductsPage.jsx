import React, { useCallback, useContext, useEffect, useState } from 'react';
import './styles/sidebar.css';
import ProdTable from './components/ProdTable';
import Sidebar from './components/Sidebar/Sidebar';
import { useHttp } from '../hooks/http.hook';
import { MainContext } from '../App';
import { useMessage } from '../hooks/message.hook';
import { ProductsContext } from './ProductsContext';
import LoaderCircular from '../AppointmentPage/components/LoaderLinear';

const ProductsPage = ({ modal }) => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    orderBy: 'name',
    search: '',
    category: '0',
    priceMax: '',
    priceMin: '',
  });
  const { request, loading } = useHttp();
  const { token } = useContext(MainContext);
  const message = useMessage();
  const loadData = useCallback(async () => {
    try {
      const data = await request(`/api/products/?orderBy=name`, 'get', null, {
        Authorization: `Bearer ${token}`,
      });
      if (data.message) return message(data.message);
      console.log(data.products);
      setProducts(data.products);
    } catch (e) {}
  }, [token, message, request]);

  const handleSearch = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/?search=${filters.search}&orderBy=${filters.orderBy}&priceMin=${filters.priceMin}&priceMax=${filters.priceMax}`,
        'get',
        null,
        { Authorization: `Bearer ${token}` }
      );
      if (data.message) return message(data.message);
      setProducts(data.products);
    } catch (e) {}
  }, [request, token, filters, message]);

  const changeFilters = (e) => {
    const { name, value } = e.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  useEffect(() => {
    handleSearch(filters.search);
  }, [filters.search, handleSearch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <main>
      <ProductsContext.Provider value={{ products, filters, changeFilters }}>
        <div className='row'>
          <div className='col s12 m4 l3'>
            <Sidebar />
          </div>

          <div className='col s12 m8 l9'>
            {loading ? <LoaderCircular /> : <ProdTable modal={modal} />}
          </div>
        </div>
      </ProductsContext.Provider>
    </main>
  );
};

export default React.memo(ProductsPage);
