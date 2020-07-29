import React from 'react';
import { Button, Checkbox, Form, Select } from "semantic-ui-react";

class CreateForm extends React.Component {
    state = {
        address: this.props.address,
        city: this.props.city,
        area: this.props.area,
        state: this.props.state,
        infoWindow: true,
        mapPosition: {
          lat: this.props.mapPosition.lat,
          lng: this.props.mapPosition.lng,
        },
        markerPosition: {
          lat: this.props.markerPosition.lat,
          lng: this.props.markerPosition.lng,
        },
      };
      prefillForm = () => {
        if (this.props.location) {
          this.setState({
            name: this.props.location.name,
            tagline: this.props.location.tagline,
            description: this.props.location.description,
          });
        }
      };
      componentDidMount() {
        this.prefillForm()
      }

      onChange = (event) => {
        const key = event.target.id;
        if (event.target.tagName.toLowerCase() === 'span' || event.target.childElementCount > 0) {
            this.setState({
                category: event.target.innerText
            })
        }
        
        if (event.target?.files) {
          this.setState({
            [key]: event.target.files[0],
          });
        } else {
          this.setState({
            [key]: event.target.value,
          });
        }
      };
    render() {
        console.log(this.props)
        return (
            <Form
            className="location-form"
            onSubmit={(e) => this.props.onFormSubmit(e, this.state)}
            encType="multipart/form-data"
          >
            <Form.Field>
              <label htmlFor="">Address</label>
              <input
                type="text"
                name="address"
                className="form-control read-only"
                onChange={this.props.parentChange}
                readOnly="readOnly"
                value={this.props.address}
              />
            </Form.Field>
            <Form.Field className="hidden">
              <label htmlFor="">Latitude</label>
              <input
                type="text"
                name="address"
                className="form-control"
                onChange={this.props.parentChange}
                readOnly="readOnly"
                value={this.props.markerPosition.lat}
              />
            </Form.Field>
            <Form.Field className="hidden">
              <label htmlFor="">Longitude</label>
              <input
                type="text"
                name="address"
                className="form-control"
                onChange={this.props.parentChange}
                readOnly="readOnly"
                value={this.props.markerPosition.lng}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="name">Name</label>
              <input
                onChange={this.onChange}
                value={this.state.name}
                id="name"
                name="name"
                placeholder="Name"
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="tagline">Tagline</label>
              <input
                onChange={this.onChange}
                value={this.state.tagline}
                id="tagline"
                name="tagline"
                placeholder="Tagline"
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="description">Description</label>
              <textarea
                onChange={this.onChange}
                value={this.state.description}
                name="description"
                id="description"
                rows={5}
              />
            </Form.Field>
            <Form.Field>
              <Select
                placeholder="Category"
                options={this.props.categories}
                onChange={this.onChange}
                value={this.state.category}
                name="category"
                id="category"
              ></Select>
            </Form.Field>
            <Form.Field>
              <label htmlFor="image">Image</label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={this.onChange}
              />
            </Form.Field>
            <Button type="submit">Submit</Button>
          </Form>
        )
    }
}

export default CreateForm;