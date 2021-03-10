import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'materialize-css';
import '../LoginPage/styles/main.css';
import InputPatient from './components/InputPatient';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { InputContext } from './InputContext';
import GoodsTable from './components/GoodsTable';
import LoaderCircular from './components/LoaderLinear';
import { MainContext } from '../App';

const AppointmentPage = () => {
  const [form, setForm] = useState({
    cart: [],
    patient: {
      name: '',
      surname: '',
      patronymic: '',
      dateOfBirth: '',
    },
    doctor: {},
  });
  const { request, loading } = useHttp();
  const message = useMessage();
  const { id } = useParams();
  const { token } = useContext(MainContext);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = await request(
        `/api/appointments/${id}`,
        'put',
        {
          ...form,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      message(data.message);
      window.scroll({
        top: 0,
        behavior: 'smooth',
      });
    } catch (e) {}
  };

  const handleLoad = useCallback(async () => {
    try {
      const data = await request(`/api/appointments/${id}`, 'get', null, {
        Authorization: `Bearer ${token}`,
      });
      if (data.message) return message(data.message);
      setForm(data.appointment);
    } catch (e) {}
  }, [request, setForm, message, id, token]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => {
      const patient = {
        ...prevState.patient,
        [name]: value,
      };
      return { ...prevState, patient };
    });
  };

  const cartCountChange = (e, product) => {
    const { name, value } = e.target;

    if (+value === 0)
      return setForm((prevState) => {
        const idx = prevState.cart.findIndex(
          (item) => item._id === product._id
        );
        if (idx > -1) {
          const newItem = {
            _id: name,
            name: product.name,
            count: 0,
            price: product.price,
            sum: Number.parseInt(product.price),
          };
          prevState.cart.splice(idx, 1);
          const cart = [...prevState.cart, newItem];

          return { ...prevState, cart };
        }
      });
    setForm((prevState) => {
      const idx = prevState.cart.findIndex((item) => item._id === product._id);
      if (idx > -1) {
        const newItem = {
          _id: name,
          name: product.name,
          count: +value,
          price: prevState.cart[idx].price,
          sum: Number.parseInt(product.price) * Number.parseInt(value),
        };
        prevState.cart.splice(idx, 1);
        const cart = [...prevState.cart, newItem];

        return { ...prevState, cart };
      }
    });
  };

  const smoothScroll = () => {
    window.scroll({ top: 0 });
    message('Изменения успешно сохранены');
  };

  const addToCart = async (product) => {
    const candidate = form.cart.findIndex((item) => product._id === item._id);

    if (candidate > -1) {
      return message('Уже добавлено');
    } else {
      setForm((prevState) => {
        const newItem = {
          _id: product._id,
          name: product.name,
          count: 1,
          price: product.price,
          sum: product.price,
        };
        const cart = [...prevState.cart, newItem];

        return { ...prevState, cart };
      });
    }
  };

  useEffect(() => {
    console.log('main', form);
  }, [form]);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  if (loading) return <LoaderCircular />;

  return (
    <main>
      <InputContext.Provider
        value={{ changeHandler, form, addToCart, cartCountChange }}
      >
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
          </div>
          <GoodsTable />
          <div>
            {loading ? (
              <LoaderCircular loading={loading} />
            ) : (
              <button
                className='btn'
                style={{ marginTop: 20 }}
                onClick={handleSubmit}
              >
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
