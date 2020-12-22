const { Schema, model, Types } = require('mongoose');

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
  surname: String,
  patronymic: String,
  post: {
    type: String,
    required: true,
  },
});

module.exports = model('Doctors', Users);
