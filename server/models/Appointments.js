const { Schema, model, Types } = require('mongoose');

const Appointments = new Schema(
  {
    number: {
      type: Number,
      autoIncrement: true,
    },
    dateOfAppointment: {
      type: Date,
      required: true,
    },
    doctor: {
      type: Types.ObjectId,
      ref: 'Doctors',
    },
    patient: {
      type: Types.ObjectId,
      ref: 'Patients',
    },
    hospital: {
      type: Types.ObjectId,
      ref: 'Hospital'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model('Appointments', Appointments);
