import React, {useState} from 'react'
import 'materialize-css'
import '../styles/main-page.css'
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'
import AppointmentsList from "../components/AppointmentsList";

const MainPage = () => {
  const [date, setDate] = useState(new Date())

  return (
    <div className="row mt-1">
      <div className="col s12 m4 l3">
        <Calendar
          style={{width: 350}}
          value={date}
          onChange={setDate}
        />
      </div>

      <div className="col s12 m8 l9">
        <AppointmentsList />
      </div>

    </div>
  )
}

export default MainPage;