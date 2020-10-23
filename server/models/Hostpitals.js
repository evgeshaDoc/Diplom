const { Schema, Types, model } = require('mongoose');

const Hospital = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

module.exports = model('Hospital', Hospital);
