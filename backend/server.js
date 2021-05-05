const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

const DB_URL = process.env.DB_URL;

// Server start

app.use(cors);
app.use(express.json());

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
