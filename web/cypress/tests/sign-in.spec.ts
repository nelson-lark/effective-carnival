import { signInPage } from "../support/page-objects/methods/sign-in-page";
import { createRandomUser } from "../support/generate-data";
import { authSelectors } from "../support/page-objects/selectors/auth-selectors";

const user = createRandomUser();

describe("Sign in page test suite", () => {
  before(() => {
    cy.setLanguage("en");
    cy.visit("/sign-in");
    cy.checkThatSubpageURLContains("/sign-in");
  });

  it("User is able to see password after clicking show password icon", () => {
    cy.typeText(authSelectors.passwordInput, user.correctPassword);
    cy.clickOn(authSelectors.showPasswordButton);
    signInPage.checkThatPasswordFieldContainsCorrectValue(
      authSelectors.passwordInput,
      user.correctPassword
    );
    cy.clickOn(authSelectors.showPasswordButton);
    signInPage.checkThatPasswordIsNotVisible(authSelectors.passwordInput);
  });

  it("User is not able to sign in when email is missing", () => {
    cy.clickOn(authSelectors.signInButton);
    cy.checkValidation("Email is a required field");
    cy.checkThatSubpageURLContains("/sign-in");
  });

  it("User is not able to sign in when password is missing", () => {
    cy.typeText(authSelectors.emailInput, user.correctEmail);
    cy.clearElement(authSelectors.passwordInput);
    cy.clickOn(authSelectors.signInButton);
    cy.checkValidation("Password is a required field");
    cy.checkThatSubpageURLContains("/sign-in");
  });

  it("User is not able to sign in when email address is incorrect", () => {
    cy.clearElement(authSelectors.emailInput);
    cy.typeText(authSelectors.emailInput, user.wrongEmail);
    cy.typeText(authSelectors.passwordInput, user.correctPassword);
    cy.clickOn(authSelectors.signInButton);
    cy.checkValidation("Invalid email address");
    cy.checkThatSubpageURLContains("/sign-in");
  });

  it("User is not able to sign in with non existing user data", () => {
    cy.loginAs(user.correctEmail, user.correctPassword);
    cy.checkThatSubpageURLContains("/sign-in");
  });
});
