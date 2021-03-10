import React, { useContext, useEffect, useState } from 'react';
import '../styles/appiontment-page.css';
import { InputContext } from '../InputContext';

const InputPatient = ({ name, label }) => {
  const { changeHandler, form } = useContext(InputContext);

  useEffect(() => {
    window.M.updateTextFields();
  });

  return (
    <div className='input-field'>
      <input
        type='text'
        id={name}
        name={name}
        className='validate'
        value={form.patient[name]}
        onChange={changeHandler}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default InputPatient;
