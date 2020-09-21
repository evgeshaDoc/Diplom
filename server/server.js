require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const appointmentsRoutes = require('./routes/appointments.routes')

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/appointments', appointmentsRoutes)


const PORT = process.env.PORT || 5000

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  } catch (e) {
    console.log(e.message)
  }
}

start().catch(e => console.log(e.message))