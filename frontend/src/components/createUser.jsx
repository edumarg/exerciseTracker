import React, { Component } from "react";

class CreateUser extends Component {
  state = { username: " " };

  handleChange(event) {
    const myUsername = event.target.value;
    this.setState({ username: myUsername });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = this.state.username;
    console.log(user);
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
