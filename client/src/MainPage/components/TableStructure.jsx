import React, { useContext } from 'react';
import { AppointmentsContext } from '../AppointmentsContext';
import { useHistory } from 'react-router-dom';
import CustomModal from './Modal';

const TableStructure = ({ appointment }) => {
  const { removeAppointment } = useContext(AppointmentsContext);

  const history = useHistory();

  const handleClick = (id) => history.push(`/appointment/${id}`);

  return (
    <tr>
      <td onClick={() => handleClick(appointment.id)}>{appointment.number}</td>
      <td onClick={() => handleClick(appointment.id)}>{appointment.fio}</td>
      <td onClick={() => handleClick(appointment.id)}>{appointment.date}</td>
      <td onClick={() => handleClick(appointment.id)}>{appointment.doctor}</td>
      <td>
        <CustomModal appointment={appointment} rm={removeAppointment} />
      </td>
    </tr>
  );
};

export default TableStructure;
