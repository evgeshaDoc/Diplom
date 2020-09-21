const {Router} = require('express')
const router = Router()

const Appointments = require('../models/Appointments')

router.get('/', async (req, res) => {
  const appointments = await Appointments.find({})
  res.json({
    appointments
  })
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const appointment = await Appointments
    .findById(id)
    .populate('patient')
    .populate('doctor')
    .exec()

  if (!appointment) {
    res.status(500).json({
      message: 'Не удалось найти данный прием'
    })
  }
  res.json({appointment})
})

router.post('/:id',async (req, res) => {
  const {name, surname, patronymic, city} = req.body

  console.log(req.body);

  setTimeout(() => {
    res.status(202).json({
      message: 'Запрос успешен'
    })
  }, 5000)
  // res.status(202).json({
  //   message: 'Запрос успешен'
  // })
})

module.exports = router