const mongoose = require('mongoose');
const Workout = require('../models/Workout');

// GET all (latest first)
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  const emptyFields = [];
  if (!title || !String(title).trim()) emptyFields.push('title');
  if (load === undefined || load === '' || load === null) emptyFields.push('load');
  if (reps === undefined || reps === '' || reps === null) emptyFields.push('reps');
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
  }

  if (isNaN(Number(load)) || Number(load) < 0) {
    return res.status(400).json({ error: 'Load must be a valid number (0 or more)', emptyFields: ['load'] });
  }
  if (isNaN(Number(reps)) || Number(reps) < 1) {
    return res.status(400).json({ error: 'Reps must be a valid number (1 or more)', emptyFields: ['reps'] });
  }

  try {
    const workout = await Workout.create({ title, load: Number(load), reps: Number(reps) });
    res.status(201).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE by id
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid workout id' });
  }
  try {
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getWorkouts, createWorkout, deleteWorkout };
