import React, { Component } from "react";
import axios from "axios";

class CreateUser extends Component {
  state = { username: " " };

  handleChange(event) {
    const myUsername = event.target.value;
    this.setState({ username: myUsername });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const user = { username: this.state.username };
    console.log(user);
    try {
      const response = await axios.post(
        "http://localhost:3900/api/users",
        user
      );
      console.log("User created!!!", response.data);
    } catch (ex) {
      console.log("error", ex.message);
    }

    this.setState({ username: "" });
  }

  render() {
    return (
      <React.Fragment>
        <h2 className="mx-5">Create User</h2>
        <div className="container">
          <form onSubmit={(event) => this.handleSubmit(event)}>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                required
                value={this.state.username}
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

export default CreateUser;
