import React from "react";
import { LocationsContext } from "../context/LocationsContext";
import moment from "moment";
import { Button, Checkbox, Form } from "semantic-ui-react";

class Comments extends React.Component {
  static contextType = LocationsContext;
  state = {comments: [], location_id: this.props.location_id}
  
  componentWillReceiveProps=(nextProps)=>{
    this.setNewState(nextProps)
}
  setNewState=(props = this.props)=>{
    this.setState({...props})
  }

  renderComments = (comments) => {
    console.log(comments)
    if(comments.length===0){this.loadFromRails()}
    else if(comments[0]===0){return(<p>No comment</p>)}
    else {return(
      comments.map(comment=>{
        return (
        <>
        <span>{comment.user}</span><span>{moment(comment.created_at).startOf("minute").fromNow()}</span>
        <p>{comment.body}</p>
        </>)
      })
    )}
  }

    getComments = async () => {
      const id = this.state.location_id
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/${id}/comments`);
      const comments  = await response.json();
      console.log(comments)
      if (comments.status >= 400) {
        this.props.history.push("/notfound")
      } 
      this.setState({comments: comments})
    }

    loadFromRails = () => {
      this.getComments()
    }

    onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    // this.props.onFormHandler(this.state)
    const data = {body: this.state.newComment, location_id: this.state.location_id}
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/locations/${this.state.location_id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: data,
      })
  }
  // onFormSubmit = async (event) => {
  //   event.preventDefault();
  //   const data = new FormData()
  //   for (let key in this.state) {
  //     data.append(`bookmark[${key}]`, this.state[key])
  //   }
  //   const response = await fetch(
  //     `${process.env.REACT_APP_BACKEND_URL}/bookmarks`,
  //     {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //       body: data,
  //     }
  //   );
  //   const { image, bookmark } = await response.json();
  //   this.context.dispatch("add", {...bookmark, image});
  //   this.props.history.push("/bookmarks");
  // };


  render() {
    return (
        <>
        <p>Comment container here</p>
        {this.state && this.renderComments(this.state.comments)}
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
          <label>Comment</label>
          <textarea onChange={this.onInputChange}  value={this.state.body} id="body" />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
        </>
    );
  }
}

export default Comments;
