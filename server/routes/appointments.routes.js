const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth.middleware');
const router = Router();

const Appointments = require('../models/Appointments');

router.get('/', auth, async (req, res) => {
  try {
    const { date, orderBy, minSum, maxSum } = req.body;
    const query = {};

    if (date) query.date = { createdAt: { $gte: date } };
    if (orderBy) query.sort(orderBy);
    if (minSum) query.price = { $gte: minSum };
    if (maxSum) query.price = { ...query.price, $lte: maxSum };

    const appointments = await Appointments.find(query);
    res.json({
      appointments,
    });
  } catch (e) {
    res.status(500).json({
      message: 'Не удалось найти приемы, попробуйте позже',
    });
  }
});

router.get('/:id', auth, async (req, res) => {
  const id = req.params.id;
  const appointment = await Appointments.findById(id)
    .populate('patient')
    .populate('doctor')
    .exec();

  if (!appointment) {
    res.status(404).json({
      message: 'Не удалось найти данный прием',
    });
  }
  res.json({ appointment });
});

router.post('/:id', auth, async (req, res) => {
  const { name, surname, patronymic, city } = req.body;

  console.log(req.body);

  setTimeout(() => {
    res.status(202).json({
      message: 'Запрос успешен',
    });
  }, 5000);
  // res.status(202).json({
  //   message: 'Запрос успешен'
  // })
});

router.post('/:id/edit', auth, async (req, res) => {
  const { id } = req.body;
  delete req.body.id;

  const updatedAppointment = await Appointments.populate('doctor')
    .populate('patient')
    .findOneAndUpdate({ _id: req.body.id }, { ...req.body });

  if (!updatedAppointment.ok) {
    return res.status(400).json({
      message: 'Ошибка при обновлении приема. Проверьте введенные данные',
    });
  }

  const appointment = Appointments.findOne({ _id: id });

  if (!appointment) {
    return res.status(500).json({
      message: 'Ошибка при обновлении приема. Попробуйте позднее',
    });
  }

  res.status(200).json({
    message: 'Данные о приеме успешно обновлены',
  });
});

/* TODO
- запись на прием
- повторная запись
- 
*/
router.post(
  '/create',
  [
    auth,
    check(['name', 'surname'], 'Введите верные данные').isLength(3),
    check('hospital', 'Выберите больницу').notEmpty(),
    check('doctor', 'Выберите врача').notEmpty(),
    check('date', 'Выберите время приема').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors) {
      return res.json({
        message: 'Ошибка при заполнении формы',
        errors,
      });
    }
  }
);

module.exports = router;
