import React, { Component } from "react";
import axios from "axios";

class CreateExercise extends Component {
  state = {
    data: {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
    },
    users: [],
  };

  async getUsers() {
    const response = await axios.get("http://localhost:3900/api/users");
    return response.data;
  }

  async componentDidMount() {
    const myUsers = await this.getUsers();
    this.setState({ users: myUsers });
  }

  handleChange(event) {
    const input = event.target;
    const { data } = this.state;

    const myData = { ...data };
    myData[input.name] = input.value;

    this.setState({ data: myData });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { username, description, duration, date } = this.state.data;
    const myDate = date.split("-");
    const newDAte = new Date(myDate[2], myDate[1] - 1, myDate[0]);
    console.log("DATE:", newDAte);
    const exercise = {
      username: username,
      description: description,
      duration: parseInt(duration),
      date: newDAte,
    };
    try {
      const response = await axios.post(
        "http://localhost:3900/api/exercises",
        exercise
      );
      console.log(response.data);
    } catch (ex) {
      console.log(ex.message);
    }
    // window.location = "/";
  }

  render() {
    const { data, users } = this.state;
    return (
      <React.Fragment>
        <h2 className="mx-5">Create Exercise</h2>
        <div className="container">
          <form onSubmit={(event) => this.handleSubmit(event)}>
            <select
              className="form-select"
              id="username"
              name="username"
              autoFocus
              required
              onChange={(event) => this.handleChange(event)}
            >
              <option defaultValue>Choose a user</option>
              {users.map((user) => (
                <option value={user.name} key={user._id}>
                  {user.username}
                </option>
              ))}
            </select>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={data["description"]}
                required
                onChange={(event) => this.handleChange(event)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="duration" className="form-label">
                Duration (minutes)
              </label>
              <input
                type="number"
                className="form-control"
                id="duration"
                name="duration"
                value={data["duration"]}
                min="0"
                required
                onChange={(event) => this.handleChange(event)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={data["date"]}
                required
                onChange={(event) => this.handleChange(event)}
              />
            </div>
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default CreateExercise;
