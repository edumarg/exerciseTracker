import { React } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Navbar from "./components/navBar";
import CreateUser from "./components/createUser";
import CreateExercise from "./components/createExercise";
import EditExercise from "./components/editExercise";
import Exercises from "./components/exercises";
import NotFound from "./components/notFound";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/user" component={CreateUser} />
        <Route path="/exercise/:id" component={EditExercise} />
        <Route path="/exercise" component={CreateExercise} />
        <Route path="/exercises" component={Exercises} />
        <Route path="/not-found" component={NotFound} />
        <Redirect from="/" exact to="/exercises" />
        <Redirect to="/not-found" />
      </Switch>
    </Router>
  );
}

export default App;
