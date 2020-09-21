import React from 'react';
import '../styles/loader-styles.css'
import 'materialize-css'

const LoaderLinear = ({loading}) => {
  return (
    <div className={loading ? 'body' : 'body-hidden'}>
      {/*<div className="progress">*/}
      {/*  <div className="indeterminate"/>*/}
      {/*</div>*/}
      <div className="preloader-wrapper small active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"/>
          </div>
          <div className="gap-patch">
            <div className="circle"/>
          </div>
          <div className="circle-clipper right">
            <div className="circle"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoaderLinear;