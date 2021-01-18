import React, { Component } from 'react';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class CustomModal extends Component {
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
        <button
          className='btn-small red lighten-2 modal-trigger'
          data-target='modal1'
        >
          Удалить
        </button>

        <div
          ref={(Modal) => {
            this.Modal = Modal;
          }}
          id='modal1'
          className='modal'
        >
          <div className='modal-content'>
            <h4>Удаление</h4>
            <p>Удалить этот прием?</p>
          </div>
          <div className='modal-footer'>
            <button
              className='modal-close btn-small green darken-2'
              onClick={() => {
                console.log(`Deleted appointment ${this.props.appointment.id}`);
                this.props.rm(this.props.appointment.id);
              }}
              style={{ marginRight: '10px' }}
            >
              Да
            </button>
            <button className='modal-close btn-small red lighten-2'>Нет</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomModal;
