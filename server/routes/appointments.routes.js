const {Router} = require('express')
const router = Router()

router.post('/:id',async () => {
  const {name, surname, patronymic, city} = req.body

  console.log(req.body);
})

module.exports = router