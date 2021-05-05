const express = require("express");
const router = express.Router();

const User = require("../models/user");

// GET users

async function getUsers() {
  const users = await User.find();
  return users;
}

router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.send(users);
  } catch (ex) {
    res.status(400).send(ex.message);
  }
});

// Get user by ID

async function getUserById(id) {
  const users = await User.findById(id);
  return users;
}

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await getUserById(id);
  if (!user) return res.status(404).send("User not found");
  res.send(user);
});

// POST New User

async function postNewUser(data) {
  try {
    const user = new User(data);
    const result = await user.save();
    return result;
  } catch (ex) {
    res.status(400).send(ex.message);
  }
}

router.post("/", async (req, res) => {
  const user = await postNewUser(req.body);
  res.send(user);
});

// / PUT or UPDATE user

async function updateUserById(id, data) {
  const user = await User.findByIdAndUpdate(
    { _id: id },
    { $set: data },
    { new: true }
  );
  return user;
}

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const user = await updateUserById(id, data);
  if (!user) return res.status(404).send("User not found");
  res.send(user);
});

// DELETE user

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findByIdAndDelete(id);
  if (!user) return res.status(404).send("User not found");
  res.send(user);
});

module.exports = router;
