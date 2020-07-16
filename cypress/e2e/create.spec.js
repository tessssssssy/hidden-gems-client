import { locationBuilder } from '../support/generate'


describe("when adding text to make a new location user", () => {
  beforeEach(() => {
    cy.fixture("token").then(({ jwt }) => {
      window.localStorage.setItem("token", jwt);
    });
  });

  it("should be able to submit the form and be redirected to the /main page", () => {
    const location = locationBuilder()
    cy.visit("/location/create");
    cy.findByLabelText(/Name/).type(location.name);
    cy.findByLabelText(/Tagline/).type(name.tagline);
    cy.findByLabelText(/Description/).type(location.description);
    cy.get('form').submit()
    .url()
    .should('eq', 'http://localhost:8080/main')
  });

  after(() => {
    window.localStorage.removeItem("token")
    window.sessionStorage.removeItem("auth")
  })
});