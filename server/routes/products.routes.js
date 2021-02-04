const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth.middleware');
// const isAdmin = require('../middleware/isAdmin.middleware');
const Products = require('../models/Products');

const router = Router();

router.get('/', auth, async (req, res) => {
  try {
    const { priceMax, priceMin, orderBy } = req.body;

    const query = {};
    if (orderBy) query.sort(orderBy);
    if (priceMax) query.price = { $lte: +priceMax };
    if (priceMin) query.price = { ...query.price, $gte: +priceMin };

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
    // isAdmin,
    check('name', 'Введите название товара').notEmpty(),
    check('price', 'Введите цену товара').notEmpty(),
    check('remains', 'Введите остаток по товарам').notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(500).json({
          message: 'Заполните все поля',
          errors,
        });
      }
      const { name } = req.body;

      const productCandidate = await Products.find({ name });
      if (productCandidate.length > 0)
        return res.json({
          message: 'Такой товар уже существует',
          productCandidate,
        });

      const product = new Products({ ...req.body });
      await product.save();
      res.json({ message: 'Товар был успешно добавлен', product });
    } catch (e) {
      res.status(500).json({ message: 'Произошла ошибка, попробуйте позднее' });
    }
  }
);

router.put(
  '/:id',
  [
    // isAdmin,
    check('name', 'Название не должно быть пустым').notEmpty(),
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

      const candidiate = await Products.findById(req.params.id);
      if (!candidiate)
        return res.status(404).json({ message: 'Такого товара не существует' });

      const updatedProduct = await Products.findByIdAndUpdate(
        { _id: req.params.id },
        { ...req.body }
      );

      if (!updatedProduct.ok)
        return res.status(500).json({ message: 'Не удалось обновить товар' });

      res.json({ message: 'Товар успешно обновлен' });
    } catch (e) {
      res
        .status(500)
        .json({ message: 'Что-то пошло не так, попробуйте позднее' });
    }
  }
);

module.exports = router;
