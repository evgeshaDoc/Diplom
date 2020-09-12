const express = require('express')

const appointemtsRoutes = require('./routes/appointments.routes')

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/appointments', appointemtsRoutes)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))