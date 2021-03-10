import React, { useState, useEffect, useCallback, useContext } from 'react';
import 'materialize-css';
import './styles/main-page.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AppointmentsList from './components/AppointmentsList';
import { useHttp } from '../hooks/http.hook';
import { MainContext } from '../App';
import { useMessage } from '../hooks/message.hook';
import { AppointmentsContext } from './AppointmentsContext';
import LoaderCircular from '../AppointmentPage/components/LoaderLinear';

const MainPage = () => {
  const [date, setDate] = useState(new Date());
  const [appointment, setAppointment] = useState([]);
  const { request, loading } = useHttp();
  const { token } = useContext(MainContext);
  const message = useMessage();

  const loadData = useCallback(
    async (date) => {
      try {
        const data = await request(
          `/api/appointments/?date=${date}`,
          'get',
          null,
          { Authorization: `Bearer ${token}` }
        );
        if (data.message) return message(data.message);
        setAppointment(data.appointments);
      } catch (e) {}
    },
    [token, message, request]
  );

  const removeAppointment = (id) => {
    const arr = appointment.filter((appointment) => appointment.id !== id);
    setAppointment(arr);
  };

  useEffect(() => {
    loadData(date);
    console.log(date);
  }, [date, loadData]);

  return (
    <AppointmentsContext.Provider value={{ removeAppointment }}>
      <main>
        <div className='row mt-1'>
          <div className='col s12 m4 l3'>
            <Calendar style={{ width: 350 }} value={date} onChange={setDate} />
          </div>

          <div className='col s12 m8 l9'>
            {loading ? (
              <LoaderCircular />
            ) : (
              <AppointmentsList appointment={appointment} />
            )}
          </div>
        </div>
      </main>
    </AppointmentsContext.Provider>
  );
};

export default MainPage;
