const { Schema, model } = require('mongoose');

const Users = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  patronymic: String,
  post: {
    type: String,
    required: true,
  },
});

module.exports = model('Doctors', Users);
