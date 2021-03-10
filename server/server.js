require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const appointmentsRoutes = require('./routes/appointments.routes');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/products.routes');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/appointments', appointmentsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (e) {
    console.log(e.message);
  }
}

start();
