require('dotenv').config();
const jwt = require('jsonwebtoken');
module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Вы не авторизованы' });

    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.admin = verified.payload.isAdmin;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Вы не авторизованы' });
  }
};
