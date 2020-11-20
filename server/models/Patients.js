const {Schema, model, Types} = require('mongoose')

const Patients = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  patronymic: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  diagnoses: {
    items: [
      {
        diagnosisId: {
          type: Types.ObjectId,
          ref: 'Diagnoses',
        }
      }
    ]
  }
}, {
  timestamps: true
})

Patients.methods.addDiagnosis = async function (diag) {
  const items = this.diagnoses.items
  items.push({
    diagnosisId: diag._id
  })
  this.diagnoses = {items}
  await this.save()
}

Patients.methods.removeDiagnosis = async function (diag) {
  const items = this.diagnoses.items
  const newItems = items.filter(item => item.diagnosisId !== diag._id)

  this.diagnoses = {newItems}
  await this.save()
}

Patients.methods.deleteAllDiadnoses = async function () {
  this.diagnoses = {items: []}
  await this.save()
}

module.exports = model('Patients', Patients)