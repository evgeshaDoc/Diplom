const { model, Schema } = require('mongoose');

const Products = new Schema({
  name: {
    type: String,
    required: true,
  },
  article: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  remains: {
    type: Number,
    required: true,
  },
  picture: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

module.exports = model('Products', Products);
