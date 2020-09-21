const {Schema, model, Types} = require('mongoose')

const Diagnoses = new Schema({
  diagnosis: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  patient: {
    type: Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

module.exports = model('Diagnoses', Diagnoses)