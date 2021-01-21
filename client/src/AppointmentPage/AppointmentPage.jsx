import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'materialize-css';
import '../LoginPage/styles/main.css';
import InputPatient from './components/InputPatient';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { InputContext } from './InputContext';
import LoaderLinear from './components/LoaderLinear';
import { appointments as mock } from '../mocks/appointments';
import GoodsTable from './components/GoodsTable';

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

  useEffect(() => {
    message(errors);
    clearErrors();
  }, [errors, clearErrors, message]);

  useEffect(() => {
    setForm(mock[id - 1]);
  }, [setForm, id, form]);

  useEffect(() => {
    window.M.updateTextFields();
  });

  return (
    <>
      <InputContext.Provider value={{ changeHandler, form }}>
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
              <LoaderLinear loading={loading} />
            ) : (
              <button
                className='btn'
                onClick={() =>
                  window.scroll({
                    top: 0,
                    behavior: 'smooth',
                  })
                }
              >
                Сохранить
              </button>
            )}
          </div>
        </div>
      </InputContext.Provider>
    </>
  );
};

export default AppointmentPage;
