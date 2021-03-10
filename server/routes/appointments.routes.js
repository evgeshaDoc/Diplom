const { Router } = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth.middleware');
const { AppointmentsController } = require('../controllers');
const router = Router();

router.get('/create', AppointmentsController.getForCreation);

router.get('/create/available', AppointmentsController.getAvailableTime);

router.get('/', auth, AppointmentsController.getAppointments);

router.get('/:id', auth, AppointmentsController.getOne);

router.put('/:id/', auth, AppointmentsController.updateOne);

router.post(
  '/create',
  [
    check(['name', 'surname'], 'Введите верные данные').isLength(3),
    check('doctor', 'Выберите врача').notEmpty(),
    check('date', 'Выберите время приема').notEmpty(),
  ],
  AppointmentsController.createAppointmentPatient
);

module.exports = router;
