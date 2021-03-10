import React from 'react';
import TableStructure from './TableStructure';

const AppointmentsList = ({ appointment }) => {
  return (
    <>
      <table className='highlight responsive-table'>
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Дата/Время</th>
            <th>Врач</th>
            <th style={{ width: 20 }} />
          </tr>
        </thead>

        <tbody>
          {appointment.map((item) => (
            <TableStructure key={item._id} appointment={item} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AppointmentsList;
