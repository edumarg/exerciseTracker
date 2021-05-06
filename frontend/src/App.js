import { React } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Navbar from "./components/navBar";
import CreateUser from "./components/createUser";
import CreateExercise from "./components/createExercise";
import EditExercise from "./components/editExercise";
import Exercises from "./components/exercises";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/user" component={CreateUser} />
      <Route path="/exercise/:id" component={EditExercise} />
      <Route path="/exercise" exact component={CreateExercise} />
      <Route path="/" exact component={Exercises} />
    </Router>
  );
}

export default App;
