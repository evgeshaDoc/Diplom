import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles/appiontment-page.css';
import InputPatient from './components/InputPatient';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { InputContext } from './InputContext';
import LoaderLinear from './components/LoaderLinear';

const AppointmentPage = () => {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    patronymic: '',
    city: '',
  });
  const { request, loading, errors, cleatErrors } = useHttp();
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
    cleatErrors();
  }, [errors, cleatErrors, message]);

  useEffect(() => {});

  return (
    <>
      <InputContext.Provider value={{ changeHandler, form }}>
        <div className="container">
          <form method="post" onSubmit={(e) => handleSubmit(e)}>
            <div className="row">
              <div className="col s6">
                <InputPatient name="name" label="Имя" />
              </div>
              <div className="col s6">
                <InputPatient name="surname" label="Фамилия" />
              </div>
            </div>
            <div className="row">
              <div className="col s6">
                <InputPatient name="patronymic" label="Отчество" />
              </div>
              <div className="col s6">
                <InputPatient name="city" label="Город" />
              </div>
            </div>
            <div className="button-container">
              <button type="submit" className="btn" disabled={loading}>
                Сохранить
              </button>
              {loading ? <LoaderLinear loading={loading} /> : null}
            </div>
          </form>
        </div>
      </InputContext.Provider>
    </>
  );
};

export default AppointmentPage;
