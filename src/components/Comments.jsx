import React from "react";
import { LocationsContext } from "../context/LocationsContext";
import moment from "moment";

class Comments extends React.Component {
  static contextType = LocationsContext;
  
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
      const id = this.props.match.params.id
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/commentss/${id}`);
      const comments  = await response.json();
      console.log(comments)
      if (comments.status >= 400) {
        this.props.history.push("/notfound")
      } 
      this.setState({comments: comments, comments: comments})
    }

    loadFromRails = () => {
      // this.getComments()
    }
    

  render() {
    console.log(this.state)
    return (
        <>
        {this.state && this.renderComments(this.state.comments, this.state.location_id) }
        </>
    );
  }
}

export default Comments;
