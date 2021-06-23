import { signInPageSelectors } from "cypress/support/page-objects/selectors/sign-in-page";
import { signInPage } from "cypress/support/page-objects/methods/sign-in-page";
import { createRandomUser } from "../../support/generate-data";

const newUser = createRandomUser();

describe("Sign in page test suite", () => {
  before(() => {
    cy.visit("/sign-in");
    cy.checkThatSubpageURLContains("/sign-in");
  });

  it("User is able to see password after clicking show password icon", () => {
    cy.fillInputField(
      signInPageSelectors.passwordInput,
      newUser.correctPassword
    );
    cy.clickOn(signInPageSelectors.showPasswordButton);
    signInPage.checkThatPasswordFieldContainsCorrectValue(
      newUser.correctPassword
    );
    cy.clickOn(signInPageSelectors.showPasswordButton);
    signInPage.checkThatPasswordIsNotVisible();
  });

  it("User is not able to sign in when email is missing", () => {
    cy.clearInputField(signInPageSelectors.emailInput);
    cy.clearInputField(signInPageSelectors.passwordInput);
    cy.fillInputField(
      signInPageSelectors.passwordInput,
      newUser.correctPassword
    );
    cy.clickOn(signInPageSelectors.signInButton);
    cy.checkValidation("Email is a required field");
    cy.checkThatSubpageURLContains("/sign-in");
  });

  it("User is not able to sign in when password is missing", () => {
    cy.fillInputField(signInPageSelectors.emailInput, newUser.correctEmail);
    cy.clearInputField(signInPageSelectors.passwordInput);
    cy.clickOn(signInPageSelectors.signInButton);
    cy.checkValidation("Password is a required field");
    cy.checkThatSubpageURLContains("/sign-in");
  });

  it("User is not able to sign in when email address is incorrect", () => {
    cy.clearInputField(signInPageSelectors.emailInput);
    cy.fillInputField(signInPageSelectors.emailInput, newUser.wrongEmail);
    cy.fillInputField(
      signInPageSelectors.passwordInput,
      newUser.correctPassword
    );
    cy.clickOn(signInPageSelectors.signInButton);
    cy.checkValidation("Invalid email address");
    cy.checkThatSubpageURLContains("/sign-in");
  });

  it("User is not able to sign in with non existing user data", () => {
    cy.loginAs({
      email: newUser.correctEmail,
      password: newUser.correctPassword,
    });
    cy.checkThatSubpageURLContains("/sign-in");
  });
});
