const Appointments = require('../models/Appointments');

export default class AppointmentController {

  static getAll = async (req, res) => {
    const appointments = await Appointments.find({})
    res.json({
      appointments
    })
  }
}