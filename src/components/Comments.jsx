import React from "react";
import { LocationsContext } from "../context/LocationsContext";
import moment from "moment";
import { Button, Checkbox, Form } from "semantic-ui-react";

class Comments extends React.Component {
  static contextType = LocationsContext;
  state = { comments: [], location_id: this.props.location_id, body: "", comment_id: null, create: true, disabled: "disabled" };

  componentWillReceiveProps = (nextProps) => {
    this.setNewState(nextProps);
  };
  setNewState = (props = this.props) => {
    this.setState({ ...props });
  };

  renderComments = (comments) => {
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
            <span>{comment.username}</span>
            <span>
              {moment(comment.created_at).startOf("minute").fromNow()}
            </span>
            </div>
              <span>{comment.body}</span>
              {comment.username === currentUser && 
              <>
                <span onClick={this.onClickEdit} id={comment.id}> Edit </span>
                <span onClick={() => this.deleteComment(comment.id)}> Delete </span>
              </>}
          </div>
        );
      });
    }
  };

  componentDidMount=()=>{
    this.checkUser()
  }

  checkUser=()=>{
    (sessionStorage.getItem("currentUser") && localStorage.getItem("token")) && this.setState({disabled: ""})
  }
  onClickEdit = (e) => {
    this.setState({create: false})
    this.getEditComment(e.target.id)
  }

  getEditComment = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/locations/${this.state.location_id}/comments/${id}`
    );
    const comment = await response.json();
    this.setState({body: comment.body, comment_id: comment.id})
  }

  getComments = async () => {
    const id = this.state.location_id;
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/locations/${id}/comments`
    );
    const comments = await response.json();
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

  onFormSubmitCreate = async (event) => {
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
    this.setState({ body: "", create: true });
    this.loadFromRails();
  };

  onFormSubmitEdit = async (event) => {
    event.preventDefault();
    const data = { body: this.state.body, location_id: this.state.location_id };
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/locations/${this.state.location_id}/comments/${this.state.comment_id}`,
      {
        method: "PUT",
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
    this.loadFromRails();
  };
 
  render() {
    console.log(this.context);
    return (
      <>
        <p>Comment container here</p>
        {this.state && this.renderComments(this.state.comments)}
        {this.state.create && (<><Form onSubmit={this.onFormSubmitCreate}>
          <Form.Field>
            <label>Add Comment</label>
            <textarea
              disabled={this.state.disabled}
              onChange={this.onInputChange}
              value={this.state.body}
              id="body"
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form></>)}
          {!this.state.create && (<><Form onSubmit={this.onFormSubmitEdit}>
          <Form.Field>
            <label>Edit Comment</label>
            <textarea
              onChange={this.onInputChange}
              value={this.state.body}
              id="body"
            />
          </Form.Field>
          <Button type="submit">Update</Button>
        </Form></>)}
      </>
    );
  }
}

export default Comments;
