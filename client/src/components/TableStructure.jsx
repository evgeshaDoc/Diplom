import React, {useContext} from "react";
import {AppointmentsContext} from "../contexts/AppointmentsContext";
import {useHistory} from "react-router-dom";

const TableStructure = ({appointment}) => {
  const {removeAppointment} = useContext(AppointmentsContext)

  const history = useHistory()

  const handleClick = id => history.push(`/appointment/${id}`)

  return (
    <tr>
      <td onClick={() => handleClick(appointment.id)}>{appointment.number}</td>
      <td onClick={() => handleClick(appointment.id)}>{appointment.fio}</td>
      <td onClick={() => handleClick(appointment.id)}>{appointment.date}</td>
      <td onClick={() => handleClick(appointment.id)}>{appointment.doctor}</td>
      <td>
        <button onClick={() => removeAppointment(appointment.id)} className="btn-small red lighten-2">Удалить</button>
      </td>
    </tr>
  )
}

export default TableStructure