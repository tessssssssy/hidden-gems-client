import React from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";

class LocationForm extends React.Component {
  state = {
    name: "",
    tagline: "",
    description: "",
    address: "",
    longitude: "",
    latitude: "",
    loading: true,
  };

  onInputChange = (event) => {
    this.setState({
<<<<<<< HEAD
      [event.target.id]: event.target.value
    })
}     
onFormSubmit = async (event) => {
  console.log(this.state)
    event.preventDefault()
    try {
      await fetch(`http://localhost:3000/locations`, {
          method: "POST",
          headers: {
            'Content-Type': "application/json"     
          },
          body: JSON.stringify(this.state)
        })
    } catch (err) {
      console.log(err)
    }     
}
=======
      [event.target.id]: event.target.value,
    });
  };

  componentDidMount() {
    const location = this.props.location;
    this.setState({ ...location, loading: false });
    console.log(this.state);
  }

  setLoading = () => this.setState({ loading: false });
>>>>>>> d556b188312f66e1ba5c70263dd95df39acedf4b
  render() {
    const {
      name, tagline, description, address, longitude, latitude, } = this.state;
    return (
      <Form onSubmit={this.onFormSubmit}>
        <Form.Field>
          <label>Name</label>
          <input onChange={this.onInputChange} value={name} id="name" placeholder="Name" />
        </Form.Field>
        <Form.Field>
          <label>Tagline</label>
          <input
            onChange={this.onInputChange}
            value={tagline}
            id="tagline"
            placeholder="Tagline"
          />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <textarea onChange={this.onInputChange}  value={description} id="description" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default LocationForm;
