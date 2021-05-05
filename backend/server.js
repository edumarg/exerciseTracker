const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const usersRouter = require("./routes/users");
const exercisesRouter = require("./routes/exercises");

const app = express();

const port = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

// Server start

app.use(cors);
app.use(express.json());
app.use("/users", usersRouter);
app.use("/exercises", exercisesRouter);

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});

// DB connection

mongoose.connect(`${DB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.log.bind(console, "DB connection error:"));
db.once("open", function () {
  console.log("Succesfully connected to the DB...");
});
