import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

const LocationForm = () => (
  <Form>
    <Form.Field>
      <label>Name</label>
      <input placeholder='Name' />
    </Form.Field>
    <Form.Field>
      <label>Tagline</label>
      <input placeholder='Tagline' />
    </Form.Field>
    <Form.Field>
        <label>Description</label>
      <textarea/>
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
)

export default LocationForm;