import { userBuilder } from "../support/generate";

describe("when clicking on signup from the homepage user", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.findByTestId(/signup/).click();
  });

  it("should be able to type into username, email and password inputs", () => {
    const { username, email, password } = userBuilder()
    cy.findByLabelText(/username/i).type(username).should("contain.value", username)
    cy.findByLabelText(/email/i).type(email).should("contain.value", email)
    cy.findByLabelText(/password/i).type(password).should("contain.value", password)
  })

  it("should be able to click on submit and be navigated to /main", () => {
    const { username, email, password } = userBuilder()
    cy.fillOutForm(username, email, password)
    cy.findByText(/Submit/i).click();
    cy.url().should('eq', "http://localhost:8080/main", {timeout: 20000})
    cy.window().its("localStorage.token").should("be.a", "string");
    // cy.findByTestId("no-bookmarks", {timeout: 500});
  });
});

