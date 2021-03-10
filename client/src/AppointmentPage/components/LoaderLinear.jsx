import React from 'react';
import '../styles/loader-styles.css';
import 'materialize-css';

const LoaderCircular = () => {
  return (
    <div className='position'>
      {/*<div className="progress">*/}
      {/*  <div className="indeterminate"/>*/}
      {/*</div>*/}
      <div className='preloader-wrapper large active'>
        <div className='spinner-layer spinner-blue-only'>
          <div className='circle-clipper left'>
            <div className='circle' />
          </div>
          <div className='gap-patch'>
            <div className='circle' />
          </div>
          <div className='circle-clipper right'>
            <div className='circle' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoaderCircular;
