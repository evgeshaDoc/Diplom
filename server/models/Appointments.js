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
    time: {
      type: Array,
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
    cart: [
      {
        _id: {
          type: Types.ObjectId,
        },
        name: {
          type: String,
        },
        count: {
          type: Number,
        },
        price: {
          type: Number,
        },
        sum: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model('Appointments', Appointments);
