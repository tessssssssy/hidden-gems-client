import React from "react";
import { Rating } from "semantic-ui-react";
class RatingBar extends React.Component {
  state = {
    rating: 0,
    likes: sessionStorage.getItem("likes") || [],
    location_id: this.props.location_id,
  };

  handleRate = (e, { rating, maxRating }) => {
    this.setState({ rating, maxRating });
    rating === 1 ? this.addLike() : this.removeLike();
  };

  addLike = async (rating, maxRating) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/locations/${this.state.location_id}/likes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.status)
    if(response.status === 201){
      const likes = JSON.parse(sessionStorage.getItem("likes"));
      sessionStorage.setItem("likes",JSON.stringify([...likes,this.state.location_id]));
    }
  };

  removeLike = async (rating, maxRating) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/locations/${this.state.location_id}/likes`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if(response.status === 200){
      let likes = JSON.parse(sessionStorage.getItem("likes"));
      likes = likes.filter((like)=>{return like !== this.state.location_id})
      sessionStorage.setItem("likes",JSON.stringify(likes));
    }
  };

  componentDidMount() {
    this.checkLike();
  }

  checkLike() {
    const likes = JSON.parse(this.state.likes);
    const like = likes.find((e) => e == this.state.location_id);
    if (like !== undefined) {
      this.setState({ rating: 1, maxRating: 1 });
    }
  }

  render = () => {
    let currentUser = sessionStorage.getItem("currentUser");
    console.log(this.state);
    return (
      <>
        {currentUser && (
          <>
            <Rating
              icon="heart"
              size="large"
              rating={this.state.rating}
              maxRating={1}
              onRate={this.handleRate}
            />
            <pre hidden>{JSON.stringify(this.state, null, 2)}</pre>
          </>
        )}
      </>
    );
  };
}

export default RatingBar;
