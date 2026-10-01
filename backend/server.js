require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => { console.log(req.method, req.path); next(); });

app.use('/api/workouts', workoutRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 4000, () =>
      console.log(`Connected to MongoDB Atlas, server on port ${process.env.PORT || 4000}`)
    );
  })
  .catch((err) => console.error('DB connection error:', err.message));
