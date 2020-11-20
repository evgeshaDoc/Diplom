import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMessage } from '../hooks/message.hook';
import { useHttp } from '../hooks/http.hook';

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
        if (!validatePass)
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
        const validate = value;
        setForm((prevState) => ({ ...prevState, post: value }));
        if (value === 'none')
          setFormErrors((prevState) => ({
            ...prevState,
            post: 'Выберите должность',
          }));
        else setFormErrors((prevState) => delete prevState.post);
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formErrors) return message('Форма заполнена неверно');
    const res = await request('/api/auth/register', 'post', { ...form });

    if (res.errors) return message(res.errors);
    history.push('/login', { email: form.email });
  };

  return (
    <>
      <div className='main'>
        <div className='card blue-grey darken-1' style={{ width: '50%' }}>
          <div className='card-content white-text'>
            <span className='card-title'>Регистрация</span>
            <div className='input-field'>
              <label htmlFor='email'>Email</label>
              <input
                name='email'
                id='email'
                type='text'
                value={form.email}
                inputMode='email'
                onChange={checkFields}
              />
            </div>
            <div className='input-field'>
              <label htmlFor='password'>Пароль</label>
              <input
                name='password'
                id='password'
                type='password'
                value={form.password}
                onChange={checkFields}
              />
            </div>
            <div className='input-field'>
              <label htmlFor='repeat'>Повторите пароль</label>
              <input
                name='repeat'
                id='repeat'
                type='password'
                value={form.repeat}
                onChange={checkFields}
              />
            </div>
            <div className='input-field'>
              <label htmlFor='name'>Имя</label>
              <input
                name='name'
                id='name'
                type='text'
                value={form.name}
                onChange={checkFields}
              />
            </div>
            <div className='input-field'>
              <label htmlFor='surname'>Фамилия</label>
              <input
                name='surname'
                id='surname'
                type='text'
                value={form.surname}
                onChange={checkFields}
              />
            </div>
            <div>
              <select
                name='post'
                id='post'
                value={form.post}
                onChange={checkFields}
              >
                <option value='none' selected disabled hidden>
                  Выберите должность
                </option>
                <option value='1'></option>
                <option value='2'>Option 2</option>
                <option value='3'>Option 3</option>
                <option value='4'>Option 4</option>
              </select>
            </div>
            <div className='card-action'>
              <button
                disabled={!errors}
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
