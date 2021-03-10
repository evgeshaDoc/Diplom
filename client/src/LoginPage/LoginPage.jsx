import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './styles/main.css';
import 'materialize-css';
import { useHttp } from '../hooks/http.hook';
import { MainContext } from '../App';
import { useMessage } from '../hooks/message.hook';
import LoaderCircular from '../AppointmentPage/components/LoaderLinear';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const location = useLocation();
  const { request, loading } = useHttp();
  const { login, token } = useContext(MainContext);
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
      setErrors((prevState) => delete prevState.password);
    } else {
      setErrors((prevState) => ({
        ...prevState,
        password: 'Длина пароля должна быть больше 5 символов',
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await request('/api/auth/login', 'post', { email, password });

    console.log(res);
    if (res.message) return message(res.message);
    login(res.token);
    history.push('/appointments');
  };

  useEffect(() => {
    if (token) {
      login(token);
      history.push('/appointments');
    }
  }, []);

  return (
    <>
      <div className='main'>
        <div className='card light-blue darken-1' style={{ width: '50%' }}>
          <div className='card-content white-text'>
            <span className='card-title'>Вход в аккаунт</span>
            <div className='input-field'>
              <label htmlFor='email' className='black-text'>
                Email
              </label>
              <input
                name='email'
                id='email'
                type='text'
                value={email}
                inputMode='email'
                onChange={(e) => checkEmail(e.target.value)}
                autoFocus
                className={!!errors.email ? 'not-valid' : null}
              />
              <span className='helper-text' style={{ color: '#cc0000' }}>
                {!!errors.email ? `${errors.email}` : null}
              </span>
            </div>
            <div className='input-field'>
              <label htmlFor='password' className='black-text'>
                Пароль
              </label>
              <input
                name='password'
                id='password'
                type='password'
                value={password}
                onChange={(e) => checkPass(e.target.value)}
                className={!!errors.email ? 'not-valid' : null}
              />
              <span className='helper-text' style={{ color: '#cc0000' }}>
                {!!errors.password ? `${errors.password}` : null}
              </span>
            </div>
          </div>
          <div className='card-action'>
            {loading ? (
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
            ) : (
              <button
                disabled={!errors}
                className='btn btn-small green darken-1'
                onClick={handleSubmit}
              >
                Войти
              </button>
            )}
            <a
              href='/register'
              style={{ marginLeft: 15 }}
              className='black-text'
            >
              Нет аккаунта? Зарегистрироваться
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
