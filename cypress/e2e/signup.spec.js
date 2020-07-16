import { userBuilder } from "../support/generate";

describe("when clicking on signup from the homepage user", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.findByTestId(/signup/).click();
  });

  it("should be able to type into email and password inputs", () => {
    const { email, password } = userBuilder()
    cy.findByLabelText(/email/i).type(email).should("contain.value", email)
    cy.findByLabelText(/password/i).type(password).should("contain.value", password)
  })

  it("should be able to click on submit and be navigated to /main", () => {
    cy.get("form").submit()
    cy.url().should('eql', "http://localhost:8080/main")
  });
});

