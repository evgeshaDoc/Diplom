import React, { Component } from 'react';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import ProdTable from '../../ProductsPage/components/ProdTable';
import Sidebar from '../../ProductsPage/components/Sidebar/Sidebar';
import ProductsPage from '../../ProductsPage/ProductsPage';

class GoodsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilters: false,
    };
    this.handleFilters = this.handleFilters.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const options = {
      onOpenStart: null,
      onOpenEnd: null,

      onCloseStart: this.handleClose,

      onCloseEnd: null,
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: '4%',
      endingTop: '10%',
    };

    M.Modal.init(this.GoodsModal, options);
  }

  handleFilters = () => {
    this.setState({ showFilters: !this.state.showFilters });
  };

  handleClose = () => {
    this.setState({ showFilters: false });
  };

  render() {
    return (
      <div>
        <div className='button modal-trigger' data-target='modal1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24'
            viewBox='0 0 24 24'
            width='24'
          >
            <path d='M0 0h24v24H0z' fill='none' />
            <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' />
          </svg>
        </div>

        <div
          ref={(GoodsModal) => {
            this.GoodsModal = GoodsModal;
          }}
          id='modal1'
          className='modal modal-fixed-footer'
        >
          <div className='modal-content'>
            <ProductsPage modal={true} />
          </div>
          <div className='modal-footer'>
            <button
              className='modal-close btn-small green darken-2'
              style={{ marginRight: '10px' }}
            >
              Готово
            </button>
            <button className='modal-close btn-small red lighten-2'>
              Отмена
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default GoodsModal;
