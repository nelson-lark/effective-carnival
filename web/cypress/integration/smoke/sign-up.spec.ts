import { createRandomUser } from "../../support/generate-data";
import { signUpPage } from "../../support/page-objects/methods/sign-up-page";
import { indexPage } from "../../support/page-objects/methods/index-page";
import { indexPageSelectors } from "../../support/page-objects/selectors/index-page";
import { signUpPageSelectors } from "cypress/support/page-objects/selectors/sign-up-page";
import { verifyEmailPage } from "cypress/support/page-objects/methods/verify-email-page";

const newUser = createRandomUser();

describe("Sign up page test suite", () => {
  before(() => {
    cy.visit("/sign-up");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when email is missing", () => {
    cy.clearInputField(signUpPageSelectors.emailInput);
    cy.fillInputField(signUpPageSelectors.phoneInput, newUser.correctPhone);
    cy.fillInputField(
      signUpPageSelectors.passwordInput,
      newUser.correctPassword
    );
    cy.clickOn(signUpPageSelectors.signUpButton);
    cy.checkValidation("Email is a required field");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when phone is missing", () => {
    cy.fillInputField(signUpPageSelectors.emailInput, newUser.correctEmail);
    cy.clearInputField(signUpPageSelectors.phoneInput);
    cy.fillInputField(
      signUpPageSelectors.passwordInput,
      newUser.correctPassword
    );
    cy.clickOn(signUpPageSelectors.signUpButton);
    cy.checkValidation("Phone number is a required field");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when password is missing", () => {
    cy.fillInputField(signUpPageSelectors.emailInput, newUser.correctEmail);
    cy.fillInputField(signUpPageSelectors.phoneInput, newUser.correctPhone);
    cy.clearInputField(signUpPageSelectors.passwordInput);
    cy.clickOn(signUpPageSelectors.signUpButton);
    cy.checkValidation("Password is a required field");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when email address is incorrect", () => {
    signUpPage.fillSignUpForm(
      newUser.wrongEmail,
      newUser.correctPhone,
      newUser.correctPassword
    );
    cy.clickOn(signUpPageSelectors.signUpButton);
    cy.checkValidation("Invalid email address");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when phone number is in a wrong format", () => {
    signUpPage.fillSignUpForm(
      newUser.correctEmail,
      newUser.wrongPhone,
      newUser.correctPassword
    );
    cy.clickOn(signUpPageSelectors.signUpButton);
    cy.checkValidation(
      "Please provide valid phone number starting with the country code, e.g. +44"
    );
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when password is too short", () => {
    signUpPage.fillSignUpForm(
      newUser.correctEmail,
      newUser.correctPhone,
      newUser.tooShortPassword
    );
    cy.checkValidation("Your password should contain at least 10 characters");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when password is too long", () => {
    signUpPage.fillSignUpForm(
      newUser.correctEmail,
      newUser.correctPhone,
      newUser.tooLongPassword
    );
    cy.checkValidation("Your password is too long, max. 80 characters");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when password contains only lower case letters", () => {
    signUpPage.fillSignUpForm(
      newUser.correctEmail,
      newUser.correctPhone,
      newUser.onlyLowerCaseLettersPassword
    );
    cy.checkValidation("Your password should contain upper case letters");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when password contains only upper case letters", () => {
    signUpPage.fillSignUpForm(
      newUser.correctEmail,
      newUser.correctPhone,
      newUser.onlyUpperCaseLettersPassword
    );
    cy.checkValidation("Your password should contain lower case letters");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is not able to sign up when password doesn't contain digits", () => {
    signUpPage.fillSignUpForm(
      newUser.correctEmail,
      newUser.correctPhone,
      newUser.withoutDigitsPassword
    );
    cy.checkValidation("Your password should contain digits");
    cy.checkThatSubpageURLContains("/sign-up");
  });

  it("User is able to sign up and see disabled resend email button", () => {
    signUpPage.fillSignUpForm(
      newUser.correctEmail,
      newUser.correctPhone,
      newUser.correctPassword
    );
    cy.clickOn(signUpPageSelectors.signUpButton);
    cy.checkThatSubpageURLContains("/verify-email");
    verifyEmailPage.checkThatResendButtonIsDisabled();
  });

  it("User is able to sign up, then sign in and then sign out", () => {
    cy.visit("/sign-up");
    signUpPage.fillSignUpForm(
      newUser.correctEmail,
      newUser.correctPhone,
      newUser.correctPassword
    );
    cy.clickOn(signUpPageSelectors.signUpButton);
    cy.checkThatSubpageURLContains("/verify-email")
      .confirmUserSignUp(newUser.correctEmail)
      .visit("/sign-in")
      .loginAs({
        email: newUser.correctEmail,
        password: newUser.correctPassword,
      })
      .checkThatSubpageURLContains("/");
    indexPage.checkIfUserAvatarIsVisible();
    cy.clickOn(indexPageSelectors.userAvatarButton);
    indexPage.checkIfUserEmailIsShown(newUser.correctEmail);
    cy.clickOn(indexPageSelectors.signOutButtonInUserMenu);
    cy.checkThatSubpageURLContains("/sign-in");
  });
});
