import { signInPageSelectors } from "../../support/page-objects/selectors/sign-in-page";
import { signInPage } from "../../support/page-objects/methods/sign-in-page";
import { createRandomUser } from "../../support/generate-data";
import { commonSelectors } from "../../support/page-objects/selectors/common-selectors";

const user = createRandomUser();

describe("Sign in page test suite", () => {
  before(() => {
    cy.setLanguage("en");
    cy.visit("/sign-in");
    cy.checkThatSubpageURLContains("/sign-in");
  });

  it("User is able to see password after clicking show password icon", () => {
    cy.fillInputField(signInPageSelectors.passwordInput, user.correctPassword);
    cy.clickOn(commonSelectors.showPasswordButton);
    signInPage.checkThatPasswordFieldContainsCorrectValue(user.correctPassword);
    cy.clickOn(commonSelectors.showPasswordButton);
    signInPage.checkThatPasswordIsNotVisible();
  });

  it("User is not able to sign in when email is missing", () => {
    cy.clickOn(signInPageSelectors.signInButton);
    cy.checkValidation("Email is a required field");
    cy.checkThatSubpageURLContains("/sign-in");
  });

  it("User is not able to sign in when password is missing", () => {
    cy.fillInputField(signInPageSelectors.emailInput, user.correctEmail);
    cy.clearInputField(signInPageSelectors.passwordInput);
    cy.clickOn(signInPageSelectors.signInButton);
    cy.checkValidation("Password is a required field");
    cy.checkThatSubpageURLContains("/sign-in");
  });

  it("User is not able to sign in when email address is incorrect", () => {
    cy.clearInputField(signInPageSelectors.emailInput);
    cy.fillInputField(signInPageSelectors.emailInput, user.wrongEmail);
    cy.fillInputField(signInPageSelectors.passwordInput, user.correctPassword);
    cy.clickOn(signInPageSelectors.signInButton);
    cy.checkValidation("Invalid email address");
    cy.checkThatSubpageURLContains("/sign-in");
  });

  it("User is not able to sign in with non existing user data", () => {
    cy.loginAs({
      email: user.correctEmail,
      password: user.correctPassword,
    });
    cy.checkThatSubpageURLContains("/sign-in");
  });
});
