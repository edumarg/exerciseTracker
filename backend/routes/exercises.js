const express = require("express");
const router = express.Router();

const Exercise = require("../models/exercise");

// GET exercises

async function getExercises() {
  const exercises = await Exercise.find();
  return exercises;
}

router.get("/", async (req, res) => {
  try {
    const exercises = await getExercises();
    res.send(exercises);
  } catch (ex) {
    res.status(400).send(ex.message);
  }
});

// Get exercise by ID

async function getExerciseById(id) {
  const exercises = await Exercise.findById(id);
  return exercises;
}

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const exercise = await getExerciseById(id);
  if (!exercise) return res.status(404).send("User not found");
  res.send(exercise);
});

// POST New Exercise

async function postNewExercise(data) {
  try {
    const exercise = new Exercise(data);
    const result = await exercise.save();
    return result;
  } catch (ex) {
    return ex.message;
  }
}

router.post("/", async (req, res) => {
  const data = req.body;
  data.duration = Number(data.duration);
  data.date = Date.parse(data.date);
  const exercise = await postNewExercise(req.body);
  res.send(exercise);
});

// / PUT or UPDATE exercise

async function updateExerciseById(id, data) {
  const exercise = await Exercise.findByIdAndUpdate(
    { _id: id },
    { $set: data },
    { new: true }
  );
  return exercise;
}

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  data.duration = Number(data.duration);
  data.date = Date.parse(data.date);

  const exercise = await updateExerciseById(id, data);
  if (!exercise) return res.status(404).send("Exercise not found");
  res.send(exercise);
});

// DELETE Exercise
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const exercise = await Exercise.findByIdAndDelete(id);
  if (!exercise) return res.status(404).send("Exercise not found");
  res.send(exercise);
});

module.exports = router;
