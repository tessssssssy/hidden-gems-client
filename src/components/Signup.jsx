import React from "react";
import { Form, Button } from "semantic-ui-react";
import "../stylesheets/Login.scss";
import { LocationsContext } from "../context/LocationsContext";

class SignUp extends React.Component {
  static contextType = LocationsContext;
  state = { username: "", email: "", password: "" };

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/sign-up`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: { username, email, password } }),
        }
      );
      if (response.status >= 400) {
        throw new Error("incorrect credentials");
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ auth: { username, email, password } }),
          }
        );
        const { jwt } = await response.json();
        localStorage.setItem("token", jwt);
        this.setCurrentUser();
        this.props.history.push("/main");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  setCurrentUser = async () => {
    const response_user = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/status/user`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const { user } = await response_user.json();
    sessionStorage.setItem("currentUser", user);
    sessionStorage.setItem("likes", JSON.stringify([]));
    sessionStorage.setItem("ratings", JSON.stringify([]));
    this.context.dispatch("current user", user);
  };

  render() {
    const { username, email, password } = this.state;
    return (
      <div className="container">
        <h1>Sign Up</h1>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={this.onInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={this.onInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={this.onInputChange}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default SignUp;
