import React from "react";
import { Rating } from 'semantic-ui-react'
class RatingBar extends React.Component {
  state = this.props;

  handleRate = (e, { rating, maxRating }) => {
    this.submitRating(rating)
    this.setState({rating, maxRating})

  }

  submitRating = async (rating) => {
        const data = { ratings: {stars: rating, location_id: this.state.location_id } };
        console.log(data)
    console.log(JSON.stringify(data))
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/locations/${this.state.location_id}/ratings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      }
    );
    console.log(response)
    this.state.reload()
  }

  render = () => {
    let currentUser = sessionStorage.getItem("currentUser");
    console.log(this.state)
    return (
      <>
        {currentUser && (
          <>
          <Rating maxRating={5} onRate={this.handleRate} />
          <pre hidden>{JSON.stringify(this.state, null, 2)}</pre>
          </>
        )}
      </>
    );
  };

}

export default RatingBar;
