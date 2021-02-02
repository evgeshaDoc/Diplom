import React, { useContext } from 'react';
import { AppointmentsContext } from '../AppointmentsContext';
import { useHistory } from 'react-router-dom';
import CustomModal from './Modal';

const TableStructure = ({ appointment }) => {
  const { removeAppointment } = useContext(AppointmentsContext);

  const history = useHistory();

  const handleClick = (e, id) => {
    const cellText = document.getSelection();
    if (cellText.type === 'Range') return e.stopPropagation();
    history.push(`/appointment/${id}`);
  };

  return (
    <tr>
      <td onClick={(e) => handleClick(e, appointment.id)}>
        {appointment.number}
      </td>
      <td onClick={(e) => handleClick(e, appointment.id)}>{appointment.fio}</td>
      <td onClick={(e) => handleClick(e, appointment.id)}>
        {appointment.date}
      </td>
      <td onClick={(e) => handleClick(e, appointment.id)}>
        {appointment.doctor}
      </td>
      <td>
        <CustomModal appointment={appointment} rm={removeAppointment} />
      </td>
    </tr>
  );
};

export default TableStructure;
