import React from "react";
import { LocationsContext } from "../context/LocationsContext";
import moment from "moment";
import { Button, Checkbox, Form } from "semantic-ui-react";

class Comments extends React.Component {
  static contextType = LocationsContext;
  state = { comments: [], location_id: this.props.location_id, disabled: "disabled" };

  componentWillReceiveProps = (nextProps) => {
    this.setNewState(nextProps);
  };
  setNewState = (props = this.props) => {
    this.setState({ ...props });
  };

  renderComments = (comments) => {
    console.log(this.state);
    let currentUser = sessionStorage.getItem("currentUser");
    console.log(currentUser);
    if (comments.length === 0) {
      this.loadFromRails();
    } else if (comments[0] === 0) {
      return <p>No comment</p>;
    } else {
      return comments.map((comment,index) => {
        return (
          <div key={index}>
            <div>
            <span>{comment.user}</span>
            <span>
              {moment(comment.created_at).startOf("minute").fromNow()}
            </span>
            </div>
              <span>{comment.body}</span>
              {(comment.user === currentUser && this.state.disabled==="disabled") && <span onClick={() => this.handleDisabled(comment.id)}> Edit </span>}
              {comment.user === currentUser && <span onClick={() => this.deleteComment(comment.id)}> Delete </span>}
          </div>
        );
      });
    }
  };

  getComments = async () => {
    const id = this.state.location_id;
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/locations/${id}/comments`
    );
    const comments = await response.json();
    console.log(comments);
    if (comments.status >= 400) {
      this.state.history.push("/notfound");
    }
    this.setState({ comments: comments });
  };

  loadFromRails = () => {
    this.getComments();
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const data = { body: this.state.body, location_id: this.state.location_id };
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/locations/${this.state.location_id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      }
    );
    this.setState({ body: "" });
    this.loadFromRails();
  };

  deleteComment = async (id) => {
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/locations/${this.state.location_id}/comments/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("say hellllllo");
    this.loadFromRails();
  };

  handleDisabled(id) {
    this.setState( {disabled: !this.state.disabled, commentToBeUpdated: id} )
  } 

  handleKeyDown=(id, body)=>{
    const {comments} = this.state
    comments[id].body=body
    console.log(comments)
  }
 
  render() {
    console.log(this.context);
    return (
      <>
        <p>Comment container here</p>
        {this.state && this.renderComments(this.state.comments)}
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>Comment</label>
            <textarea
              onChange={this.onInputChange}
              value={this.state.body}
              id="body"
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </>
    );
  }
}

export default Comments;
