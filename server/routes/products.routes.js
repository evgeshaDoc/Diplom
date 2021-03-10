const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth.middleware');
const Products = require('../models/Products');
const { ProductsController } = require('../controllers');

const router = Router();

router.get('/', auth, ProductsController.getAll);

router.get('/:id', auth, ProductsController.getOne);

router.post(
  '/create',
  [
    check('name', 'Введите название товара').notEmpty(),
    check('price', 'Введите цену товара').notEmpty(),
    check('remains', 'Введите остаток по товарам').notEmpty(),
  ],
  ProductsController.createProduct
);

router.put(
  '/:id',
  [
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
