const { model, Schema, Types } = require('mongoose');

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
});

module.exports = model('Products', Products);
