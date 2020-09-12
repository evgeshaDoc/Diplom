import React, {useEffect, useState} from 'react';
import '../styles/appiontment-page.css'

const InputPatient = ({name, label}) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    console.log(value)
  }, [value])

  return (
    <div className='input-field'>
      <input
        type="text"
        id={name}
        name={name}
        className='validate'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default InputPatient;