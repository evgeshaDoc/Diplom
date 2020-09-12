import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import '../styles/appiontment-page.css'
import InputPatient from "../components/InputPatient"
import {useHttp} from "../hooks/http.hook";

const AppointmentPage = () => {
  const [form,setForm] = useState({
    name: '',
    surname: '',
    patronymic: '',
    city: ''
  })
  const {request, loading, errors} = useHttp()
  const {id} = useParams()

  const handleSubmit = async () => {
    try {
      const data = await request(`/api/appointments/${id}`, 'post', {...form})
    } catch (e) {}
  }

  const changeHandler = (e) => setForm({...form, [e.target.name]: e.target.value})

  return (
    <>
      <div className='container'>
        <form method='post'>
          <div className="row">
            <div className="col s6">
              <InputPatient name='name' label='Имя'/>
            </div>
            <div className="col s6">
              <InputPatient name='surname' label='Фамилия'/>
            </div>
          </div>
          <div className="row">
            <div className="col s6">
              <InputPatient name='patronymic' label='Отчество'/>
            </div>
            <div className="col s6">
              <InputPatient name='city' label='Город'/>
            </div>
          </div>
          <button
            type='submit'
            className='btn'
            onClick={(e) => {
              console.log(e.target);
            }}
          >
            Сохранить
          </button>
        </form>
      </div>
    </>
  )
}

export default AppointmentPage;