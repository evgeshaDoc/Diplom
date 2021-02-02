import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'materialize-css';
import '../LoginPage/styles/main.css';
import InputPatient from './components/InputPatient';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { InputContext } from './InputContext';
import { appointments as mock } from '../mocks/appointments';
import GoodsTable from './components/GoodsTable';
import LoaderCircular from './components/LoaderLinear';

const AppointmentPage = () => {
  const [form, setForm] = useState({
    id: 0,
    number: 0,
    fio: '',
    name: '',
    surname: '',
    patronymic: '',
    date: '',
    doctor: '',
    city: '',
    cart: [
      {
        id: 0,
        name: '',
        count: 0,
        price: 0,
      },
    ],
  });
  const { request, loading, errors, clearErrors } = useHttp();
  const message = useMessage();
  const { id } = useParams();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = await request(`/api/appointments/${id}`, 'post', {
        ...form,
      });
      message(data.message);
      window.scroll({
        top: 0,
        behavior: 'smooth',
      });
    } catch (e) {}
  };

  const handleLoad = async (event) => {
    try {
      const body = {
        id,
        ...form,
      };
      await request(`/api/appointments/${id}`, 'get', body);
    } catch (e) {}
  };

  const changeHandler = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const smoothScroll = () => {
    window.scroll({ top: 0 });
    message('Изменения успешно сохранены');
  };

  const addToCart = async (product) => {
    const candidate = form.cart.findIndex((item) => product.id === item.id);

    if (candidate > -1) {
      return message('Уже добавлено');
    } else {
      setForm((prevState) => {
        const newItem = {
          id: product.id,
          name: product.name,
          count: 1,
          price: product.price,
        };
        const cart = [...prevState.cart, newItem];

        return { ...prevState, cart };
      });
    }
  };

  useEffect(() => {
    message(errors);
    clearErrors();
  }, [errors, clearErrors, message]);

  useEffect(() => {
    setForm(mock[id - 1]);

  }, []);

  useEffect(() => {
    window.M.updateTextFields();
  });

  return (
    <main>

      <InputContext.Provider value={{ changeHandler, form, addToCart }}>

        <div className='container' style={{ marginTop: '20px' }}>
          <div className='row'>
            <div className='col s6'>
              <InputPatient name='name' label='Имя' />
            </div>
            <div className='col s6'>
              <InputPatient name='surname' label='Фамилия' />
            </div>
          </div>
          <div className='row'>
            <div className='col s6'>
              <InputPatient name='patronymic' label='Отчество' />
            </div>
            <div className='col s6'>
              <InputPatient name='city' label='Город' />
            </div>
          </div>
          <GoodsTable />
          <div>
            {loading ? (

              <LoaderCircular loading={loading} />
            ) : (
              <button className='btn' onClick={smoothScroll}>

                Сохранить
              </button>
            )}
          </div>
        </div>
      </InputContext.Provider>
    </main>
  );
};

export default AppointmentPage;
