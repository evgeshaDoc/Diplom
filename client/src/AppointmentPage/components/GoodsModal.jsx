import React, { Component } from 'react';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class GoodsModal extends Component {
  componentDidMount() {
    const options = {
      onOpenStart: null,
      onOpenEnd: null,
      onCloseStart: null,
      onCloseEnd: null,
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: '4%',
      endingTop: '10%',
    };
    M.Modal.init(this.Modal, options);
  }

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
          ref={(Modal) => {
            this.Modal = Modal;
          }}
          id='modal1'
          className='modal'
        >
          <div className='modal-content'>
            <h4>Добавление</h4>
            <p>Удалить этот прием?</p>
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
