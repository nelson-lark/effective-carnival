import { forgotPasswordPage } from "../../support/page-objects/methods/forgot-password-page";
import { createRandomUser } from "../../support/generate-data";
import { forgotPasswordPageSelectors } from "../../support/page-objects/selectors/forgot-password-page";
import { signInPageSelectors } from "../../support/page-objects/selectors/sign-in-page";

const user = createRandomUser();

describe("Forgot password page test suite", () => {
  before(() => {
    cy.setLanguage("en");
    cy.visit("/forgot-password");
    cy.checkThatSubpageURLContains("/forgot-password");
  });

  it("User is not able to reset password when the email address is missing", () => {
    cy.clickOn(forgotPasswordPageSelectors.resetPasswordButton);
    cy.checkValidation("Email is a required field");
    cy.checkThatSubpageURLContains("/forgot-password");
  });

  it("User is not able to reset password when the email address is incorrect", () => {
    cy.fillInputField(forgotPasswordPageSelectors.emailInput, user.wrongEmail);
    cy.clickOn(forgotPasswordPageSelectors.resetPasswordButton);
    cy.checkValidation("Invalid email address");
    cy.checkThatSubpageURLContains("/forgot-password");
  });

  it("User is able to go back to the sign in page", () => {
    cy.clearInputField(forgotPasswordPageSelectors.emailInput);
    cy.clickOn(forgotPasswordPageSelectors.backToSignInPageButton);
    cy.checkThatSubpageURLContains("/sign-in");
  });

  it("User is redirected to confirm-reset-password page after reseting password", () => {
    cy.clickOn(signInPageSelectors.forgotPasswordButton);
    forgotPasswordPage.fillForgotPasswordForm(user.correctEmail);
    forgotPasswordPage.submitForgotPasswordForm();
    cy.checkThatSubpageURLContains("/confirm-reset-password");
  });
});
