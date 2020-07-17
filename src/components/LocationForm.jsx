import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

class LocationForm extends React.Component {
  onInputChange = (event) => {
    this.setState({
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
  render() {
    return (
      <Form onSubmit={this.onFormSubmit}>
    <Form.Field>
      <label>Name</label>
      <input onChange={this.onInputChange} id="name" placeholder='Name' />
    </Form.Field>
    <Form.Field>
      <label>Tagline</label>
      <input onChange={this.onInputChange} id="tagline" placeholder='Tagline' />
    </Form.Field>
    <Form.Field>
        <label>Description</label>
      <textarea onChange={this.onInputChange} id="description"/>
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
    )
  }
}


export default LocationForm;