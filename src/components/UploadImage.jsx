import React from "react";
import { Form, Button } from "semantic-ui-react";
import "../stylesheets/UploadImage.scss";

class UploadImage extends React.Component {
  state = this.props;

  onChange = (event) => {
    const key = event.target.id;

    this.setState({
      [key]: event.target.files[0],
    });
  };

  submitPhoto = async (e) => {
    e.preventDefault();
    const formData = {
      image: this.state.image,
    };

    const data = new FormData();
    for (let key in formData) {
      data.append(`photo[${key}]`, formData[key]);
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/locations/${this.state.location_id}/photos`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: data,
        }
      );
      document.getElementById("image").value = null;
      this.state.reload();
      const res = await response.json();
    } catch (err) {}
  };

  render() {
    return (
      <form
        className="image-form"
        onSubmit={this.submitPhoto}
        encType="multipart/form-data"
      >
        <label htmlFor="image">Upload Image</label>
        <input onChange={this.onChange} type="file" name="image" id="image" />

        <Button type="submit">Submit</Button>
      </form>
    );
  }
}

export default UploadImage;
