import React from 'react';
import './styles/sidebar.css';
import ProdTable from './components/ProdTable';
import Sidebar from './components/Sidebar/Sidebar';

const ProductsPage = () => {
  return (
    <main>
      <div className='row'>
        <div className='col s12 m4 l3 screen-100'>
          <Sidebar />
        </div>

        <div className='col s12 m8 l9'>
          <ProdTable />
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
