import { build, fake } from '@jackfranklin/test-data-bot'

const userBuilder = build('User', {
  fields: {
    email: fake((f) => f.internet.email()),
    password: fake((f) => f.internet.password())
  }
})

const locationBuilder = build('Location', {
    fields: {
      name: fake((f) => f.address.streetName()),
      tagline: fake((f) => f.lorem.words()),
      description: fake((f) => f.lorem.words())
    }
  })
  
  export {
    userBuilder,
    locationBuilder
  }
