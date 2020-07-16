import React from "react";
import { LocationsContext } from "../context/LocationsContext";
import { Link } from "react-router-dom";

class MainPage extends React.Component {
  static contextType = LocationsContext;
  render() {
    const { locations } = this.context;
    return (
      <div className="MainPage">
      {locations.map(location => {
        return <Link to={{
          pathname: `/location/${location.id}`,
          state: location,
        }}>{location.name}</Link>
      })}
    </div>
    )  
  }
}

export default MainPage;
