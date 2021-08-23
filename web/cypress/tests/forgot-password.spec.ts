import { authSelectors } from "../support/page-objects/selectors/auth-selectors";
import { createRandomUser } from "../support/generate-data";

const user = createRandomUser();

describe("Forgot password page test suite", () => {
  before(() => {
    cy.setLanguage("en");
    cy.visit("/forgot-password");
    cy.checkThatSubpageURLContains("/forgot-password");
  });

  it("User is not able to reset password when the email address is missing", () => {
    cy.clickOn(authSelectors.resetPasswordButton);
    cy.checkValidation("Email is a required field");
    cy.checkThatSubpageURLContains("/forgot-password");
  });

  it("User is not able to reset password when the email address is incorrect", () => {
    cy.typeText(authSelectors.emailInput, user.wrongEmail);
    cy.clickOn(authSelectors.resetPasswordButton);
    cy.checkValidation("Invalid email address");
    cy.checkThatSubpageURLContains("/forgot-password");
  });

  it("User is able to go back to the sign in page", () => {
    cy.clearElement(authSelectors.emailInput);
    cy.clickOn(authSelectors.goToSignInPageButton);
    cy.checkThatSubpageURLContains("/sign-in");
  });

  it("User is redirected to confirm-reset-password page after reseting password", () => {
    cy.clickOn(authSelectors.forgotPasswordButton);
    cy.typeText(authSelectors.emailInput, user.correctEmail);
    cy.clickOn(authSelectors.resetPasswordButton);
    cy.checkThatSubpageURLContains("/confirm-reset-password");
  });
});
