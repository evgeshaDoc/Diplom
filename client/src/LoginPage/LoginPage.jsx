import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styles/main.css';
import 'materialize-css';
import { useHttp } from '../hooks/http.hook';
import { MainContext } from '../App';
import { useMessage } from '../hooks/message.hook';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { request } = useHttp();
  const { login } = useContext(MainContext);
  const message = useMessage();

  const checkEmail = (text) => {
    const validate = text.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    setEmail(text);
    if (validate) {
      setErrors((prevState) => delete prevState.email);
    } else {
      setErrors((prevState) => ({
        ...prevState,
        email: 'Неверный формат email',
      }));
    }
  };

  const checkPass = (text) => {
    const validate = text.length > 5;
    setPass(text);
    if (validate) {
      setErrors((prevState) => delete prevState.pass);
    } else {
      setErrors((prevState) => ({
        ...prevState,
        pass: 'Длина пароля должна быть больше 5',
      }));
    }
  };

  const handleSubmit = async (event) => {
    const data = await request('/api/auth/login', 'post', {
      email,
      password: pass,
    });
    if (data.message) return message(data.message);
    login(data.token);
    history.push('/appointments');
  };

  return (
    <>
      <div className='main'>
        <div className='card blue-grey darken-1' style={{ width: '50%' }}>
          <div className='card-content white-text'>
            <span className='card-title'>Вход в аккаунт</span>
            <div className='input-field'>
              <label htmlFor='email'>Email</label>
              <input
                name='email'
                id='email'
                type='text'
                value={email}
                inputMode='email'
                onChange={(e) => checkEmail(e.target.value)}
              />
            </div>
            <div className='input-field'>
              <label htmlFor='password'>Пароль</label>
              <input
                name='password'
                id='password'
                type='password'
                value={pass}
                onChange={(e) => checkPass(e.target.value)}
              />
            </div>
          </div>
          <div className='card-action'>
            <button
              disabled={!errors || !email || !pass}
              className='btn btn-small green darken-1'
              onClick={handleSubmit}
            >
              Войти
            </button>
            <a href='/register' style={{ marginLeft: 15 }}>
              Нет аккаунта? Зарегистрироваться
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
