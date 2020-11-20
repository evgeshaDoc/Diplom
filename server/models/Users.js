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
  hospital: {
    type: Types.ObjectId,
    ref: 'Hospital',
  },
});

module.exports = model('Doctors', Users);
