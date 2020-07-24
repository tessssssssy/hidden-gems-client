import React from "react";
import { Form, Button } from "semantic-ui-react";

class UploadImage extends React.Component {
  state = this.props;

  onChange = (event) => {
    const key = event.target.id;
    if (event.target?.files) {
      this.setState({
        [key]: event.target.files[0]
      })
    } else {
      this.setState({
        [key]: event.target.value,
      });
    }
  };

  submitPhoto = async (e) => {
    e.preventDefault();
    const formData = {
      image: this.state.image
    };
    // create formData
    const data = new FormData();
    for (let key in formData) {
      data.append(`photo[${key}]`, formData[key]);
    }
    console.log(data)
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
          this.state.reload();
          const res = await response.json()
              console.log(res)

    } catch (err) {
        console.log(err)
    }
    
  };

  render() {
      return (
        <Form onSubmit={this.submitPhoto} encType="multipart/form-data">
        <Form.Field>
          <label htmlFor="image">Image</label>
          <input onChange={this.onChange} type="file" name="image" id="image" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
      )
  }
}

export default UploadImage;