import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMessage } from '../hooks/message.hook';
import { useHttp } from '../hooks/http.hook';
import './styles.css';

const RegisterPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    repeat: '',
    name: '',
    surname: '',
    post: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const history = useHistory();
  const message = useMessage();
  const { loading, request, errors } = useHttp();

  const checkFields = (event) => {
    const { value, name } = event.target;

    switch (name) {
      case 'email':
        setForm((prevState) => ({ ...prevState, email: value }));
        const validateEmail = value.match(
          /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
        );
        if (!validateEmail)
          setFormErrors((prevState) => ({
            ...prevState,
            email: 'Email не соответсвует формату',
          }));
        else setFormErrors((prevState) => delete prevState.email);
        break;
      case 'password':
        const validatePass = value.length > 6;
        setForm((prevState) => ({ ...prevState, password: value }));
        if (!validatePass)
          setFormErrors((prevState) => ({
            ...prevState,
            password: 'Пароль должен быть длиннее 6 символов',
          }));
        else setFormErrors((prevState) => delete prevState.password);
        break;
      case 'repeat':
        const validateRepeat = value === form.password;
        setForm((prevState) => ({ ...prevState, repeat: value }));
        if (!validateRepeat)
          setFormErrors((prevState) => ({
            ...prevState,
            repeat: 'Пароли не совпадают',
          }));
        else setFormErrors((prevState) => delete prevState.repeat);
        break;
      case 'name':
        const validateName = value.length > 0;
        setForm((prevState) => ({ ...prevState, name: value }));
        if (!validateName)
          setFormErrors((prevState) => ({
            ...prevState,
            name: 'Необходимо ввести имя',
          }));
        else setFormErrors((prevState) => delete prevState.name);
        break;
      case 'surname':
        const validateSurname = value.length > 0;
        setForm((prevState) => ({ ...prevState, surname: value }));
        if (!validateSurname)
          setFormErrors((prevState) => ({
            ...prevState,
            surname: 'Необходимо ввести фамилию',
          }));
        else setFormErrors((prevState) => delete prevState.surname);
        break;
      case 'post':
        const validate = value.length > 3;
        setForm((prevState) => ({ ...prevState, post: value }));
        if (!validate)
          setFormErrors((prevState) => ({
            ...prevState,
            post: 'Введите должность',
          }));
        else setFormErrors((prevState) => delete prevState.post);
        break;
      default:
        return;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formErrors);
    // if (formErrors) return message('Форма заполнена неверно');
    const res = await request('/api/auth/register', 'post', { ...form });

    if (res.errors) return message(res.errors);
    history.push('/login', { email: form.email });
  };
  //TODO
  // переделать поля ввода, вынести в отдельный кастомизируемый компонент
  return (
    <>
      <div className='main'>
        <div className='card blue lighten-2' style={{ width: '50%' }}>
          <div className='card-content white-text'>
            <span className='card-title'>Регистрация</span>
            <div className='input-field'>
              <label htmlFor='email' className='black-text'>
                Email
              </label>
              <input
                name='email'
                id='email'
                type='text'
                value={form.email}
                inputMode='email'
                onChange={checkFields}
                className={!!formErrors.email ? 'not-valid' : null}
              />
              <span className='helper-text' style={{ color: '#cc0000' }}>
                {!!formErrors.email ? `${formErrors.email}` : null}
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
                value={form.password}
                onChange={checkFields}
                className={!!formErrors.password ? 'not-valid' : null}
              />
              <span className='helper-text' style={{ color: '#cc0000' }}>
                {!!formErrors.password ? `${formErrors.password}` : null}
              </span>
            </div>
            <div className='input-field'>
              <label htmlFor='repeat' className='black-text'>
                Повторите пароль
              </label>
              <input
                name='repeat'
                id='repeat'
                type='password'
                value={form.repeat}
                onChange={checkFields}
                className={!!formErrors.repeat ? 'not-valid' : null}
              />
              <span className='helper-text' style={{ color: '#cc0000' }}>
                {!!formErrors.repeat ? `${formErrors.repeat}` : null}
              </span>
            </div>
            <div className='input-field'>
              <label htmlFor='name' className='black-text'>
                Имя
              </label>
              <input
                name='name'
                id='name'
                type='text'
                value={form.name}
                onChange={checkFields}
                className={!!formErrors.name ? 'not-valid' : null}
              />
              <span className='helper-text' style={{ color: '#cc0000' }}>
                {!!formErrors.name ? `${formErrors.name}` : null}
              </span>
            </div>
            <div className='input-field'>
              <label htmlFor='surname' className='black-text'>
                Фамилия
              </label>
              <input
                name='surname'
                id='surname'
                type='text'
                value={form.surname}
                onChange={checkFields}
                className={!!formErrors.surname ? 'not-valid' : null}
              />
              <span className='helper-text' style={{ color: '#cc0000' }}>
                {!!formErrors.surname ? `${formErrors.surname}` : null}
              </span>
            </div>
            <div className='input-field'>
              <label htmlFor='post' className='black-text'>
                Занимаемая должность
              </label>
              <input
                name='post'
                id='post'
                type='text'
                value={form.post}
                onChange={checkFields}
                className={!!formErrors.email ? 'not-valid' : null}
              />
              <span className='helper-text' style={{ color: '#cc0000' }}>
                {!!formErrors.post ? `${formErrors.post}` : null}
              </span>
            </div>
            <div className='card-action'>
              <button
                // disabled={!formErrors}
                disabled={false}
                className='btn btn-small green darken-1'
                onClick={handleSubmit}
              >
                Зарегистрироваться
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
