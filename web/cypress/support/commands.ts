import "@percy/cypress";
import "@cypress/code-coverage/support";
import "cypress-file-upload";
import "cypress-localstorage-commands";
import "cypress-xpath";
import "./aws-commands";

import { authSelectors } from "./page-objects/selectors/auth-selectors";
import { indexPageSelectors } from "./page-objects/selectors/index-page";

Cypress.Commands.add(
  "fillSignUpForm",
  (email: string, phone: string, password: string) => {
    cy.typeText(authSelectors.emailInput, email);
    cy.typeText(authSelectors.phoneInput, phone);
    cy.typeText(authSelectors.passwordInput, password);
    cy.typeText(authSelectors.confirmPasswordInput, password);
  }
),
  Cypress.Commands.add("loginAs", (email: string, password: string) => {
    cy.getByDataTestId(authSelectors.emailInput).clear().type(email);
    cy.getByDataTestId(authSelectors.passwordInput).clear().type(password);
    cy.clickOn(authSelectors.signInButton);
  });

Cypress.Commands.add("signOut", () => {
  cy.clickOn(indexPageSelectors.userAvatarButton);
  cy.clickOn(indexPageSelectors.signOutButtonInUserMenu);
  cy.checkThatSubpageURLContains("/sign-in");
});

Cypress.Commands.add("setLanguage", (language: string) => {
  window.localStorage.setItem("i18nextLng", language);
});

Cypress.Commands.add("clickOn", (selector: string) => {
  cy.getByDataTestId(selector).click();
});

Cypress.Commands.add("typeText", (selector: string, text: string) => {
  cy.getByDataTestId(selector).clear().type(text);
});

Cypress.Commands.add("containText", (selector: string, text: string) => {
  cy.getByDataTestId(selector).first().contains(text);
});

Cypress.Commands.add("clearElement", (selector: string) => {
  cy.getByDataTestId(selector).clear();
});

Cypress.Commands.add("checkValidation", (validationText: string) => {
  cy.get(authSelectors.validationError)
    .contains(validationText)
    .should("be.visible");
});

Cypress.Commands.add("checkThatSubpageURLContains", (specificPage: string) => {
  cy.url().should("include", specificPage);
});

Cypress.Commands.add("getByDataTestId", (selector: string, ...args: any[]) => {
  return cy.get(`[data-testid=${selector}]`, ...args);
});
