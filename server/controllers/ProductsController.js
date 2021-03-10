const Products = require('../models/Products');

module.exports = class ProductsController {
  static getAll = async (req, res) => {
    try {
      const { priceMax, priceMin, orderBy, search } = req.query;

      const query = {};
      if (priceMax) query.price = { $lte: +priceMax };
      if (priceMin) query.price = { ...query.price, $gte: +priceMin };
      if (search) query.name = { $regex: search, $options: 'i' };

      const products = await Products.find(query).sort(orderBy);

      return res.json({ products });
    } catch (e) {
      res.json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
  };

  static getOne = async (req, res) => {
    try {
      const product = await Products.findById(req.params.id);
      if (product) {
        res.json({ product });
      } else {
        res.json({ message: 'Такой позиции не найдено' });
      }
    } catch (e) {
      res
        .status(500)
        .json({ message: 'Не удалось выполнить запрос, повторите позднее' });
    }
  };

  static createProduct = async (req, res) => {
    try {
      this.checkRequiredFields(req, res);
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
  };

  checkRequiredFields = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({
        message: 'Заполните все поля',
        errors,
      });
    }
  };
};
