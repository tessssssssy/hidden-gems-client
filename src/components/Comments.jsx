import React from "react";
import { LocationsContext } from "../context/LocationsContext";
import moment from "moment";

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
    

  render() {
    return (
        <>
        <p>Comment container here</p>
        {this.state && this.renderComments(this.state.comments)}
        </>
    );
  }
}

export default Comments;
