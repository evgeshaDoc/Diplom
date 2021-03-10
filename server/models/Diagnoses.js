const { Schema, model, Types } = require('mongoose');

const Diagnoses = new Schema(
  {
    diagnosis: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Diagnoses', Diagnoses);
