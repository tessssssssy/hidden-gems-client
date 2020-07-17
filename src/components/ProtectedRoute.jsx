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
    await this.getLocations()
    const token = localStorage.getItem("token");
    if (token === "password") {
      this.setState({
        auth: true,
        loading: false,
      });
    } else {
      this.setState({
        loading: false,
      });
    }
    this.setLoading()
  }

  getLocations = async () => {
    const response = await fetch("http://localhost:3000/locations");
    const locations = await response.json();

     this.context.dispatch("populate",{ locations });
  };

  setLoading = () => this.setState({ loading: false });

  render() {
    const { loading, auth } = this.state;
    // if (!loading && !auth) {
    //   return <Redirect to="/" />;
    // } else {
      return !loading && (
        <Route
          exact={this.props.exact}
          path={this.props.path}
          component={this.props.component}
        />
      );
    }

  }


export default ProtectedRoute;

