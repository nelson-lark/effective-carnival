import { createRandomUser } from "../support/generate-data";
import { indexPage } from "../support/page-objects/methods/index-page";
import { indexPageSelectors } from "../support/page-objects/selectors/index-page";
import { verifyEmailPage } from "../support/page-objects/methods/verify-email-page";
import { signInPage } from "../support/page-objects/methods/sign-in-page";
import { authSelectors } from "../support/page-objects/selectors/auth-selectors";

const user = createRandomUser();

describe("Sign up page test suite", () => {
  before(() => {
    cy.setLanguage("en");
    cy.visit("/sign-up");
    cy.checkThatSubpageURLContains("/sign-up");
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

  it("User is able to see confirm password after clicking show password icon", () => {
    cy.typeText(authSelectors.confirmPasswordInput, user.correctPassword);
    cy.clickOn(authSelectors.showConfirmPasswordButton);
    signInPage.checkThatPasswordFieldContainsCorrectValue(
      authSelectors.confirmPasswordInput,
      user.correctPassword
    );
    cy.clickOn(authSelectors.showConfirmPasswordButton);
    signInPage.checkThatPasswordIsNotVisible(
      authSelectors.confirmPasswordInput
    );
  });

  it("User is not able to sign up when email is missing", () => {
    cy.clearElement(authSelectors.emailInput);
    cy.percySnapshot("Sign up page test snapshot");
    cy.typeText(authSelectors.phoneInput, user.correctPhone);
    cy.clickOn(authSelectors.signUpButton);
    cy.checkValidation("Email is a required field");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when phone is missing", () => {
    cy.typeText(authSelectors.emailInput, user.correctEmail);
    cy.clearElement(authSelectors.phoneInput);
    cy.clickOn(authSelectors.signUpButton);
    cy.checkValidation("Phone number is a required field");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when password is missing", () => {
    cy.typeText(authSelectors.phoneInput, user.correctPhone);
    cy.clearElement(authSelectors.passwordInput);
    cy.clickOn(authSelectors.signUpButton);
    cy.checkValidation("Password is a required field");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when email address is incorrect", () => {
    cy.clearElement(authSelectors.emailInput);
    cy.typeText(authSelectors.emailInput, user.wrongEmail);
    cy.typeText(authSelectors.passwordInput, user.correctPassword);
    cy.clickOn(authSelectors.signUpButton);
    cy.checkValidation("Invalid email address");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when phone number is in a wrong format", () => {
    cy.clearElement(authSelectors.emailInput);
    cy.typeText(authSelectors.emailInput, user.correctEmail);
    cy.clearElement(authSelectors.phoneInput);
    cy.typeText(authSelectors.phoneInput, user.wrongPhone);
    cy.clickOn(authSelectors.signUpButton);
    cy.checkValidation(
      "Please provide valid phone number starting with the country code, e.g. +44"
    );
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when password is too short", () => {
    cy.clearElement(authSelectors.phoneInput);
    cy.typeText(authSelectors.phoneInput, user.correctPhone);
    cy.clearElement(authSelectors.passwordInput);
    cy.typeText(authSelectors.passwordInput, user.tooShortPassword);
    cy.checkValidation("Your password should contain at least 10 characters");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when password is too long", () => {
    cy.clearElement(authSelectors.passwordInput);
    cy.typeText(authSelectors.passwordInput, user.tooLongPassword);
    cy.checkValidation("Your password is too long, max. 80 characters");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when password contains only lower case letters", () => {
    cy.clearElement(authSelectors.passwordInput);
    cy.typeText(authSelectors.passwordInput, user.onlyLowerCaseLettersPassword);
    cy.checkValidation("Your password should contain upper case letters");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when password contains only upper case letters", () => {
    cy.clearElement(authSelectors.passwordInput);
    cy.typeText(authSelectors.passwordInput, user.onlyUpperCaseLettersPassword);
    cy.checkValidation("Your password should contain lower case letters");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when password doesn't contain digits", () => {
    cy.clearElement(authSelectors.passwordInput);
    cy.typeText(authSelectors.passwordInput, user.withoutDigitsPassword);
    cy.checkValidation("Your password should contain digits");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is able to sign up and use resend email button", () => {
    cy.clearElement(authSelectors.passwordInput);
    cy.typeText(authSelectors.passwordInput, user.correctPassword);
    cy.clickOn(authSelectors.signUpButton);
    cy.checkThatSubpageURLContains("/verify-email");
    verifyEmailPage.checkThatResendButtonIsEnabled();
  });

  it("User is able to sign up, then sign in and then sign out", () => {
    cy.visit("/sign-up");
    cy.fillSignUpForm(
      user.correctEmail,
      user.correctPhone,
      user.correctPassword
    );
    cy.clickOn(authSelectors.signUpButton);
    cy.checkThatSubpageURLContains("/verify-email");
    cy.confirmUserSignUp(user.correctEmail);
    cy.visit("/sign-in");
    cy.loginAs(user.correctEmail, user.correctPassword);
    cy.checkThatSubpageURLContains("/");
    indexPage.checkIfUserAvatarIsVisible();
    cy.clickOn(indexPageSelectors.userAvatarButton);
    cy.containText(indexPageSelectors.userEmailInUserMenu, user.correctEmail);
    cy.clickOn(indexPageSelectors.signOutButtonInUserMenu);
    cy.checkThatSubpageURLContains("/sign-in");
  });
});
