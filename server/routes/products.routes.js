const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/isAdmin.middleware');
const Products = require('../models/Products');

const router = Router();

router.get('/', auth, async (req, res) => {
  try {
    const { priceMax, priceMin, name, article, orderBy } = req.body;

    const query = {};
    if (orderBy) query.sort(orderBy);
    if (priceMax) query.price = { $lte: +priceMax };
    if (priceMin) query.price = { ...query.price, $gte: +priceMin };
    if (name) query.name = name;
    if (article) query.article = article;

    const products = await Products.find(query);

    return res.json({ products });
  } catch (e) {
    res.json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.get('/:id', auth, async (req, res) => {
  const product = await Products.findById(req.params.id);

  if (product) return res.json({ product });
  else return res.status(404).json({ message: 'Не удалось найти товар' });
});

router.post(
  '/create',
  [
    isAdmin,
    check('name', 'Введите название товара').notEmpty(),
    check('price', 'Введите цену товара').notEmpty(),
    check('remains', 'Введите остаток по товарам').notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (errors) {
        return res.status(500).json({
          message: 'Заполните все поля',
          errors,
        });
      }
    } catch (e) {}
  }
);

module.exports = router;
