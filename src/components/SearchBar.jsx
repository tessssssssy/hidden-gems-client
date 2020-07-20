import React from "react";
import Autocomplete from "react-google-autocomplete";

class SearchBar extends React.Component {
    render() {
      return (
        <div className="search-bar">
            <Autocomplete
            style={{
              width: "100%",
              height: "40px",
              paddingLeft: "16px",
              marginTop: "2px",
              marginBottom: "500px"
            }}
            onPlaceSelected={this.props.onPlaceSelected}
            types={["(regions)"]}
          />
        </div>
      )       
    }
}

export default SearchBar;

