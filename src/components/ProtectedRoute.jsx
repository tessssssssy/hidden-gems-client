import React from "react";
import { Route, Redirect } from "react-router-dom";
import { LocationsContext } from "../context/LocationsContext";

class ProtectedRoute extends React.Component {
  static contextType = LocationsContext
  state = {
    auth: false,
    loading: true,
  };

  async componentDidMount() {
    try {
      this.getLocations();
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/status`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      });
      if (response.status >= 400) {
        throw new Error("not authorized");
      } else {
        const { jwt } = await response.json();
        const response_user = await fetch(`${process.env.REACT_APP_BACKEND_URL}/status/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
        });
        const { user }= await response_user.json()
        console.log(user)
        this.context.dispatch("current user", user);
        localStorage.setItem("token", jwt);
        this.setAuth()
      }
    } catch (err) {
      console.log(err.message);
      this.setLoading()
    }
  }

  getLocations = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/locations`);
    const { locations } = await response.json();

     this.context.dispatch("populate",{ locations });
  };

  setLoading = () => this.setState({ loading: false });

  setAuth = () => this.setState({ auth: true, loading: false });

  render() {
    const { loading, auth } = this.state;
    if (!loading && !auth) {
      return <Redirect to="/main" />;
    } else {
      return !loading && (
        <Route
          exact={this.props.exact}
          path={this.props.path}
          component={this.props.component}
        />
      );
    }

  }
}

export default ProtectedRoute;

