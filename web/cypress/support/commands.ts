import "@percy/cypress";
import "cypress-file-upload";
import "cypress-xpath";
import "@cypress/code-coverage/support";
import "./aws-commands";
import "cypress-localstorage-commands";

import { Credentials } from "./interfaces/Credentials";
import { commonSelectors } from "./page-objects/selectors/common-selectors";
import { signInPageSelectors } from "./page-objects/selectors/sign-in-page";
import { indexPageSelectors } from "./page-objects/selectors/index-page";

Cypress.Commands.add("loginAs", ({ email, password }: Partial<Credentials>) => {
  if (email) {
    cy.getByDataTestId(signInPageSelectors.emailInput).clear().type(email);
  }
  if (password) {
    cy.getByDataTestId(signInPageSelectors.passwordInput)
      .clear()
      .type(password);
  }
  cy.clickOn(signInPageSelectors.signInButton);
});

Cypress.Commands.add("signOutFromApp", () => {
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

Cypress.Commands.add("checkRadioButton", (selector: string) => {
  cy.getByDataTestId(selector).click();
});

Cypress.Commands.add("fillInputField", (selector: string, value: string) => {
  cy.getByDataTestId(selector).clear().type(value);
});

Cypress.Commands.add("clearInputField", (selector: string) => {
  cy.getByDataTestId(selector).clear();
});

Cypress.Commands.add("checkValidation", (validationText: string) => {
  cy.get(commonSelectors.validationError)
    .contains(validationText)
    .should("be.visible");
});

Cypress.Commands.add("checkThatSubpageURLContains", (specificPage: string) => {
  cy.url().should("include", specificPage);
});

Cypress.Commands.add("getByDataTestId", (selector: string, ...args: any[]) => {
  return cy.get(`[data-testid=${selector}]`, ...args);
});
