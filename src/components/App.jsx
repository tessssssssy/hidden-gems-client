import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Landing from "./Landing";
import MainPage from "./MainPage";
import CreateLocation from "./CreateLocation";
import EditLocation from "./EditLocation";
import ShowLocation from "./ShowLocation";
import Navbar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup"
import { LocationsContext, dispatch } from "../context/LocationsContext";

class App extends React.Component {
  state = { locations: [], dispatch: dispatch.bind(this) };

  render() {
    return (
      <LocationsContext.Provider value={this.state}>
        <Navbar />
        <Switch>
          <ProtectedRoute exact path="/location/:id/edit" component={EditLocation} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/main" component={MainPage} />
          <Route exact path="/location/create" component={CreateLocation} />
          <Route exact path="/location/:id" component={ShowLocation} />
          <Route exact path="/location/:id/edit" component={EditLocation} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </LocationsContext.Provider>
    );
  }
}

export default App;
