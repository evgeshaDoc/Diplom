import React, { useEffect, useState } from 'react';
import { appointments as mock } from '../../mocks/appointments';
import { AppointmentsContext } from '../AppointmentsContext';
import TableStructure from './TableStructure';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);

  const removeAppointment = (id) => {
    const arr = appointments.filter((appointment) => appointment.id !== id);
    setAppointments(arr);
  };

  useEffect(() => {
    setAppointments(mock);
  }, [setAppointments]);

  return (
    <>
      <AppointmentsContext.Provider value={{ removeAppointment }}>
        <table className='highlight responsive-table'>
          <thead>
            <tr>
              <th>№</th>
              <th>ФИО</th>
              <th>Дата/Время</th>
              <th>Врач</th>
              <th style={{ width: 20 }} />
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <TableStructure key={appointment.id} appointment={appointment} />
            ))}
          </tbody>
        </table>
      </AppointmentsContext.Provider>
    </>
  );
};

export default AppointmentsList;
