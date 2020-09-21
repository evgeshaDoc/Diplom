const {Schema, model} = require('mongoose')

const Users = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surname: String,
  patronymic: String,
  post: String,
})

module.exports = model('Users', Users)