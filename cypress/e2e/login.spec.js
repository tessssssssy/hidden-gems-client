import { userBuilder } from "../support/generate";

describe("when clicking on login from the homepage user", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.findByTestId(/login/).click();
    });
  
    it("should be able to type into email and password inputs", () => {
      const { email, password } = userBuilder()
      cy.findByLabelText(/email/i).type(email).should("contain.value", email)
      cy.findByLabelText(/password/i).type(password).should("contain.value", password)
    })
});

describe("with the correct login credentials user", () => {
    before(() => {
      cy.fixture("user.json").then((user) => {
        cy.visit("/login")
        cy.findByLabelText(/email/i).type(user.email)
        cy.findByLabelText(/password/i).type(user.password)
      })
    });
        
    it("should be able to click on submit and be navigated to /bookmarks", () => {
      cy.get("form").submit()
      cy.url().should('eql', "http://localhost:8080/bookmarks")
    });
        
    after(() => {
      // we need to clean up after we run the tests
      window.localStorage.removeItem("token")
      window.sessionStorage.removeItem("auth")
    })
  });

  






