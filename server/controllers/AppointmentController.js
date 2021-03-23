const Appointments = require('../models/Appointments');
const Patient = require('../models/Patients');
const Users = require('../models/Users');
const times = require('../core/times');
const Products = require('../models/Products');
module.exports = class AppointmentController {
  constructor() {
    this.formatDate = this.formatDate.bind(this);
  }

  static getAppointments = async (req, res) => {
    try {
      const { date, orderBy } = req.query;
      console.log(req.query);
      const newDate = Date.parse(date);

      const appointments = await Appointments.find({
        dateOfAppointment: newDate,
        doctor: req.user.userId,
      })
        .populate('patient')
        .populate('doctor')
        .sort(orderBy)
        .exec();

      if (!appointments.length) {
        return res.json({ message: 'Приемов на этот день нет' });
      }

      return res.json({ appointments });
    } catch (e) {
      res.status(500).json({
        message: 'Не удалось найти приемы, попробуйте позже',
      });
    }
  };

  static getOne = async (req, res) => {
    try {
      const id = req.params.id;
      const appointment = await Appointments.findById({ _id: id })
        .populate('patient')
        .populate('doctor')
        .exec();

      if (!appointment) {
        res.status(404).json({
          message: 'Не удалось найти данный прием',
        });
      }
      res.json({ appointment });
    } catch (e) {
      res
        .status(500)
        .json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
  };

  static updateOne = async (req, res) => {
    try {
      const id = req.params.id;

      console.log(req.body.patient);

      const updatedAppointment = await Appointments.findOneAndUpdate(
        { _id: id },
        { ...req.body }
      );

      await Patient.findOneAndUpdate(
        { _id: req.body.patient._id },
        { ...req.body.patient }
      );

      const appointment = await Appointments.findOne({ _id: id });

      if (!appointment) {
        return res.status(500).json({
          message: 'Ошибка при обновлении приема. Попробуйте позднее',
        });
      }

      res.status(200).json({
        message: 'Данные о приеме успешно обновлены',
      });
    } catch (e) {
      res
        .status(500)
        .json({ message: 'Не удалось обновить прием, попробуйте позднее' });
    }
  };

  static getAvailableTime = async (req, res) => {
    try {
      const { date, doctor } = req.query;
      const newDate = Date.parse(date);
      console.log(date);
      const list = await Appointments.find({
        doctor,
        dateOfAppointment: newDate,
      });

      if (!list.length) {
        return res.json({ available: times });
      }
      let available = [];
      list.forEach((el) => {
        times.map((item) => {
          if (el.time.includes(item)) return false;
          else available.push(item);
        });
      });
      return res.json({ available });
    } catch (e) {
      res.status(500).json({
        message: 'Не удалось получить свободное время. Попробуйте позднее',
      });
    }
  };

  static createAppointmentPatient = async (req, res) => {
    try {
      const { doctor, time } = req.body;
      const { name, surname, patronymic, phoneNumber } = req.body.patient;
      const { date } = req.query;
      const newDate = Date.parse(date);
      console.log(date);

      console.log(req.body);
      if (!name || !surname || !patronymic || !phoneNumber)
        return res.json({ message: 'Заполните все необходимые поля' });

      const available = await Appointments.findOne({
        dateOfAppointment: newDate,
        time,
        doctor,
      });
      if (!!available) return res.json({ message: 'Данное время уже занято' });
      let id = null;
      const candidate = await Patient.findOne({ name, surname, phoneNumber });
      if (!!candidate) {
        id = candidate._id;
      } else {
        const patient = new Patient({
          name,
          surname,
          patronymic,
          phoneNumber,
        });
        await patient.save();
        id = patient._id;
      }

      const appointment = new Appointments({
        dateOfAppointment: newDate,
        doctor,
        time,
        patient: id,
      });
      await appointment.save();
      res.status(201).json({ message: 'Вы успешно записались' });
    } catch (e) {
      res
        .status(500)
        .json({ message: 'Не удалось записаться, попробуйте позднее' });
    }
  };

  static getForCreation = async (req, res) => {
    try {
      const doctors = await Users.find({});

      res.json({ doctors });
    } catch (e) {
      res.json({ message: 'Не удалось получтиь данные, попробуйте позднее' });
    }
  };

  static formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
};
