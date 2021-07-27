import { createRandomUser } from "../../support/generate-data";
import { signUpPage } from "../../support/page-objects/methods/sign-up-page";
import { indexPage } from "../../support/page-objects/methods/index-page";
import { indexPageSelectors } from "../../support/page-objects/selectors/index-page";
import { signUpPageSelectors } from "../../support/page-objects/selectors/sign-up-page";
import { verifyEmailPage } from "../../support/page-objects/methods/verify-email-page";
import { commonSelectors } from "../../support/page-objects/selectors/common-selectors";
import { signInPage } from "../../support/page-objects/methods/sign-in-page";

const user = createRandomUser();

describe("Sign up page test suite", () => {
  before(() => {
    cy.setLanguage("en");
    cy.visit("/sign-up");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is able to see password after clicking show password icon", () => {
    cy.fillInputField(signUpPageSelectors.passwordInput, user.correctPassword);
    cy.clickOn(commonSelectors.showPasswordButton);
    signInPage.checkThatPasswordFieldContainsCorrectValue(user.correctPassword);
    cy.clickOn(commonSelectors.showPasswordButton);
    signInPage.checkThatPasswordIsNotVisible();
  });

  it("User is not able to sign up when email is missing", () => {
    cy.clearInputField(signUpPageSelectors.emailInput);
    cy.percySnapshot("Sign up page test snapshot");
    cy.fillInputField(signUpPageSelectors.phoneInput, user.correctPhone);
    cy.clickOn(signUpPageSelectors.signUpButton);
    cy.checkValidation("Email is a required field");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when phone is missing", () => {
    cy.fillInputField(signUpPageSelectors.emailInput, user.correctEmail);
    cy.clearInputField(signUpPageSelectors.phoneInput);
    cy.clickOn(signUpPageSelectors.signUpButton);
    cy.checkValidation("Phone number is a required field");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when password is missing", () => {
    cy.fillInputField(signUpPageSelectors.phoneInput, user.correctPhone);
    cy.clearInputField(signUpPageSelectors.passwordInput);
    cy.clickOn(signUpPageSelectors.signUpButton);
    cy.checkValidation("Password is a required field");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when email address is incorrect", () => {
    cy.clearInputField(signUpPageSelectors.emailInput);
    cy.fillInputField(signUpPageSelectors.emailInput, user.wrongEmail);
    cy.fillInputField(signUpPageSelectors.passwordInput, user.correctPassword);
    cy.clickOn(signUpPageSelectors.signUpButton);
    cy.checkValidation("Invalid email address");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when phone number is in a wrong format", () => {
    cy.clearInputField(signUpPageSelectors.emailInput);
    cy.fillInputField(signUpPageSelectors.emailInput, user.correctEmail);
    cy.clearInputField(signUpPageSelectors.phoneInput);
    cy.fillInputField(signUpPageSelectors.phoneInput, user.wrongPhone);
    cy.clickOn(signUpPageSelectors.signUpButton);
    cy.checkValidation(
      "Please provide valid phone number starting with the country code, e.g. +44"
    );
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when password is too short", () => {
    cy.clearInputField(signUpPageSelectors.phoneInput);
    cy.fillInputField(signUpPageSelectors.phoneInput, user.correctPhone);
    cy.clearInputField(signUpPageSelectors.passwordInput);
    cy.fillInputField(signUpPageSelectors.passwordInput, user.tooShortPassword);
    cy.checkValidation("Your password should contain at least 10 characters");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when password is too long", () => {
    cy.clearInputField(signUpPageSelectors.passwordInput);
    cy.fillInputField(signUpPageSelectors.passwordInput, user.tooLongPassword);
    cy.checkValidation("Your password is too long, max. 80 characters");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when password contains only lower case letters", () => {
    cy.clearInputField(signUpPageSelectors.passwordInput);
    cy.fillInputField(
      signUpPageSelectors.passwordInput,
      user.onlyLowerCaseLettersPassword
    );
    cy.checkValidation("Your password should contain upper case letters");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when password contains only upper case letters", () => {
    cy.clearInputField(signUpPageSelectors.passwordInput);
    cy.fillInputField(
      signUpPageSelectors.passwordInput,
      user.onlyUpperCaseLettersPassword
    );
    cy.checkValidation("Your password should contain lower case letters");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when password doesn't contain digits", () => {
    cy.clearInputField(signUpPageSelectors.passwordInput);
    cy.fillInputField(
      signUpPageSelectors.passwordInput,
      user.withoutDigitsPassword
    );
    cy.checkValidation("Your password should contain digits");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is able to sign up and see disabled resend email button", () => {
    cy.clearInputField(signUpPageSelectors.passwordInput);
    cy.fillInputField(signUpPageSelectors.passwordInput, user.correctPassword);
    cy.clickOn(signUpPageSelectors.signUpButton);
    cy.checkThatSubpageURLContains("/verify-email");
    verifyEmailPage.checkThatResendButtonIsDisabled();
  });

  it("User is able to sign up, then sign in and then sign out", () => {
    cy.visit("/sign-up");
    signUpPage.fillSignUpForm(
      user.correctEmail,
      user.correctPhone,
      user.correctPassword
    );
    cy.clickOn(signUpPageSelectors.signUpButton);
    cy.checkThatSubpageURLContains("/verify-email")
      .confirmUserSignUp(user.correctEmail)
      .visit("/sign-in")
      .loginAs({
        email: user.correctEmail,
        password: user.correctPassword,
      })
      .checkThatSubpageURLContains("/");
    indexPage.checkIfUserAvatarIsVisible();
    cy.clickOn(indexPageSelectors.userAvatarButton);
    indexPage.checkIfUserEmailIsShown(user.correctEmail);
    cy.clickOn(indexPageSelectors.signOutButtonInUserMenu);
    cy.checkThatSubpageURLContains("/sign-in");
  });
});
