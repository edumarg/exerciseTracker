import React, { Component } from "react";

class CreateExercise extends Component {
  state = {
    data: {
      userId: "",
      description: "",
      duration: 0,
      date: new Date(),
    },
    users: [],
  };

  componentDidMount() {
    this.setState({
      users: [
        { _id: 1234, username: "edumarg" },
        { _id: 4567, username: "harry" },
      ],
    });
  }

  handleChange(event) {
    const input = event.target;
    const { data } = this.state;

    const myData = { ...data };
    myData[input.name] = input.value;

    this.setState({ data: myData });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { userId, description, duration, date } = this.state;
    const exercise = {
      userId: userId,
      description: description,
      duration: duration,
      date: date,
    };

    console.log(exercise);
    window.location = "/";
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
              id="userId"
              name="userId"
              autoFocus
              required
              onChange={(event) => this.handleChange(event)}
            >
              <option defaultValue>Choose a user</option>
              {users.map((user) => (
                <option value={user._id} key={user._id}>
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
