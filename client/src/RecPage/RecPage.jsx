import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar } from 'react-calendar';
import { useHttp } from '../hooks/http.hook';
import { MainContext } from '../App';
import { useMessage } from '../hooks/message.hook';
import './styles/time-grid.css';
import { Select } from 'react-materialize';

const RecPage = () => {
  const [availableTime, setAvailableTime] = useState([]);
  const [date, setDate] = useState();
  const [info, setInfo] = useState({
    doctor: '5fe1ab73b9f77e6ea4e98a63',
    date: '',
    time: [],
    patient: {
      name: '',
      surname: '',
      patronymic: '',
      phoneNumber: '',
    },
  });
  const location = useLocation();
  const { request, loading } = useHttp();
  const { token } = useContext(MainContext);
  const message = useMessage();

  const loadAvailable = useCallback(
    async (date) => {
      try {
        setDate(date);
        if (!info.doctor) return;
        const data = await request(
          `/api/appointments/create/available/?date=${date}&doctor=${info.doctor}`,
          'get',
          null,
          { Authorization: `Bearer ${token}` }
        );
        if (data.message) return message(data.message);
        setAvailableTime(data.available);
      } catch (e) {}
    },
    [message, info, request, token]
  );

  const handleRec = async () => {
    try {
      if (
        !info.patient.name ||
        !info.patient.surname ||
        !info.patient.patronymic ||
        !info.patient.phoneNumber
      )
        return message('Заполните все необходимые поля');

      const data = await request(
        `/api/appointments/create?date=${date}`,
        'post',
        {
          ...info,
        },
        { Authorization: `Bearer ${token}` }
      );
      if (data.message) return message(data.message);
    } catch (e) {}
  };

  const inputChange = (e) => {
    const { name, value } = e.target;

    const patient = { ...info.patient, [name]: value };
    setInfo((prevState) => ({ ...prevState, patient }));
  };

  const selectChange = (e) => {
    let value = [e.target.value];
    setInfo((prevState) => ({ ...prevState, time: value }));
  };

  useEffect(() => {
    if (location.state)
      setInfo((prevState) => ({ ...prevState, ...location.state }));
  }, []);

  useEffect(() => {
    setInfo((prevState) => ({ ...prevState, date }));
  }, [date]);

  // useEffect(() => {
  //   loadAvailable();
  // }, [date, loadAvailable]);

  useEffect(() => {
    console.log(info);
  }, [info]);

  return (
    <main style={{ marginTop: 20 }}>
      <div className='container'>
        <div className='row'>
          <div className='col s2 m3' />
          <div className='col s3 m4'>Врач:</div>
          <div className='col s4'>
            <select name='doctor' disabled>
              <option value={info.doctor}>Вы</option>
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='col s6'>
            <div className='input-field'>
              <input
                type='text'
                id='name'
                name='name'
                className='validate'
                value={info.patient.name}
                onChange={inputChange}
              />
              <label htmlFor='name'>Имя</label>
            </div>
          </div>
          <div className='col s6'>
            <div className='input-field'>
              <input
                type='text'
                id='surname'
                name='surname'
                className='validate'
                value={info.patient.surname}
                onChange={inputChange}
              />
              <label htmlFor='surname'>Фамилия</label>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col s6'>
            <div className='input-field'>
              <input
                type='text'
                id='patronymic'
                name='patronymic'
                className='validate'
                value={info.patient.patronymic}
                onChange={inputChange}
              />
              <label htmlFor='patronymic'>Отчество</label>
            </div>
          </div>
          <div className='col s6'>
            <div className='input-field'>
              <input
                type='text'
                id='phoneNumber'
                name='phoneNumber'
                className='validate'
                value={info.patient.phoneNumber}
                onChange={inputChange}
              />
              <label htmlFor='phoneNumber'>Номер телефона</label>
            </div>
          </div>
        </div>
        <div
          className='row'
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Calendar value={date} onChange={(val) => loadAvailable(val)} />
        </div>
        <div className='row' style={{ display: 'flex', alignItems: 'center' }}>
          <div className='col s6'>
            <span style={{ fontSize: 28, fontWeight: '600' }}>
              Выберите время:
            </span>
          </div>
          {loading ? (
            <div className='col s3'>
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
            </div>
          ) : (
            <div className='col s3'>
              <select name='time' value={info.time[0]} onChange={selectChange}>
                <option value='' selected disabled>
                  Выберите время приема
                </option>
                {availableTime.length > 0
                  ? availableTime.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))
                  : null}
              </select>
            </div>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '90%',
            marginBottom: 40,
          }}
        >
          <button className='btn btn-small green darken-1' onClick={handleRec}>
            Записать
          </button>
        </div>
      </div>
    </main>
  );
};

export default RecPage;
