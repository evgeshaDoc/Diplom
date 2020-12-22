require('dotenv').config();
const jwt = require('jsonwebtoken');
module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token)
      return res.status(401).json({ message: 'Вы не авторизированы' });

    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (verified.payload.isAdmin) {
      req.admin = verified.payload.isAdmin;
      next();
    } else {
      res.status(402).json({ message: 'Доступ запрещен' });
      next();
    }
  } catch (e) {
    return res.status(401).json({ message: 'Что-то пошло не так' });
  }
};
