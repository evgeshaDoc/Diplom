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

  const formatFIO = (user) => {
    return `${user.surname} ${user.name} ${user.patronymic}`;
  };

  return (
    <tr>
      <td onClick={(e) => handleClick(e, appointment._id)}>
        {formatFIO(appointment.patient)}
      </td>
      <td onClick={(e) => handleClick(e, appointment._id)}>
        {new Date(appointment.dateOfAppointment).toLocaleDateString()}{' '}
        {appointment.time[0]}
      </td>
      <td onClick={(e) => handleClick(e, appointment._id)}>
        {`${appointment.doctor.surname} ${appointment.doctor.name}`}
      </td>
      <td>
        <CustomModal appointment={appointment} rm={removeAppointment} />
      </td>
    </tr>
  );
};

export default TableStructure;
