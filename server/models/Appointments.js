const {Schema, model, Types} = require('mongoose')

const Appointments = new Schema({
  number: {
    type: Number,
    autoIncrement: true
  },
  doctor: {
    type: Types.ObjectId,
    ref: 'Users'
  },
  patient: {
    type: Types.ObjectId,
    ref: 'Patients'
  }
}, {
  timestamps: true
})

module.exports = model('Appointments', Appointments)