import React, {useContext} from 'react';
import '../styles/appiontment-page.css'
import {InputContext} from "../contexts/InputContext";

const InputPatient = ({name, label}) => {
  const {changeHandler, form} = useContext(InputContext)

  return (
    <div className='input-field'>
      <input
        type="text"
        id={name}
        name={name}
        className='validate'
        value={form[name]}
        onChange={(e) => changeHandler(e)}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default InputPatient;