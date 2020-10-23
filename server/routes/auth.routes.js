const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const { Users } = require('../models');
const auth = require('../middleware/auth.middleware')

const router = Router();

router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Неверный пароль').isLength({ min: 6 }),
    check('repeat', 'Введите пароль повторно').exists(),
    check('name', 'Введите имя').exists(),
    check('surname', 'Введите фамилию').exists(),
    check('post', 'Выберите Вашу должность').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(402).json({
          errors: errors.array(),
          message: 'Неверные данные при входе',
        });

      const { email, password, name, surname, post, repeat } = req.body;

      if (password !== repeat)
        return res.status(400).json({ message: 'Пароли не совпадают' });

      const candidate = await Users.findOne({ email });
      if (candidate)
        return res
          .status(400)
          .json({ message: 'Такой пользователь уже существует' });

      const hashedPass = await bcrypt.hash(password, 10);
      const user = new Users({
        email,
        password: hashedPass,
        name,
        surname,
        post,
      });
      await user.save();
      res.status(201).json({
        message: 'Вы успешно зарегестрировались',
      });
    } catch (e) {
      res.status(500).json({
        message: 'Не удалось зарегистрироваться, попробуйте позже',
      });
    }
  }
);

router.post(
  '/login',
  [
    check('email', 'Неверный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(402).json({
          errors: errors.array(),
          message: 'Неверные данные при входе',
        });

      const { email, password } = req.body;
      const candidate = await Users.findOne({ email });
      if (!candidate)
        return res
          .status(401)
          .json({ message: 'Такого пользователя не существует' });

      const areSame = await bcrypt.compare(password, candidate.password);
      if (!areSame)
        return res
          .status(401)
          .json({ message: 'Неверный пароль. Попробуйте снова' });

      const token = jwt.sign(
        { userId: candidate.id },
        process.env.TOKEN_SECRET,
        { expiresIn: '1h' }
      );
      res.json({
        token
      });
    } catch (e) {
      res.status(500).json({
        message: 'Не удалось войти, попробуйте позже',
      });
    }
  }
);

router.get('/', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) return res.status(401).json({message: "Вы не авторизованы"})

    req.user = await jwt.verify(token, process.env.TOKEN_SECRET)
    console.log(req.user);
  } catch (e) {
    res.status(500).json({
      message: 'Что-то пошло не так, попробуйте снова'
    })
  }
})

module.exports = router;
