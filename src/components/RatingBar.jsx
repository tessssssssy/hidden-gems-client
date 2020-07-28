import React from "react";
import { Rating } from "semantic-ui-react";
class RatingBar extends React.Component {
  state = {
    rating: 0,
    ratings: sessionStorage.getItem("ratings") || [],
    location_id: this.props.location_id,
    disabled: null,
  };

  handleRate = (e, { rating, maxRating }) => {
    this.submitRating(rating);
    this.setState({ rating, maxRating });
  };

  submitRating = async (rating) => {
    const data = {
      ratings: { stars: rating, location_id: this.state.location_id },
    };
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
    if(response.status===201){
      const ratings = JSON.parse(sessionStorage.getItem("ratings"));
      sessionStorage.setItem("ratings",JSON.stringify([...ratings,{location_id: this.state.location_id, stars: rating}]));
    }
    this.setState({disabled: "disabled"})
    this.props.reload();
  };

  componentDidMount() {
    this.checkRating();
  }

  checkRating() {
    const ratings = JSON.parse(this.state.ratings);
    const rating = ratings.find((e) => e.location_id == this.state.location_id);
    if (rating === undefined) {
      console.log(rating)
      this.setState({ rating: 0 })}
    else {this.setState({rating: rating.stars, disabled: "disabled"})
    }
  }


  render = () => {
    let currentUser = sessionStorage.getItem("currentUser");
    console.log(this.state);
    return (
      <>
        {currentUser && (
          <>
            <Rating rating={this.state.rating} disabled={this.state.disabled}maxRating={5} onRate={this.handleRate} />
            <pre hidden>{JSON.stringify(this.state, null, 2)}</pre>
          </>
        )}
      </>
    );
  };
}

export default RatingBar;
