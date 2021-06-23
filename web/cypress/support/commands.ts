import "@percy/cypress";

import "cypress-file-upload";

import "cypress-xpath";

import "@cypress/code-coverage/support";

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

Cypress.Commands.add("clickOn", (selector: string) => {
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

Cypress.Commands.add(
  "getByDataTestIdLike",
  (selector: string, ...args: any[]) => {
    return cy.get(`[data-testid*=${selector}]`, ...args);
  }
);

Cypress.Commands.add("confirmUserSignUp", (email: string) => {
  cy.exec(`aws cognito-idp admin-confirm-sign-up \
  --user-pool-id ${Cypress.env("AWS_COGNITO_USER_POOL_ID")} \
  --username ${email}`);
});

Cypress.Commands.add("createNormalUserWithPassword", (email: string) => {
  cy.exec(`aws cognito-idp admin-create-user \
  --user-pool-id ${Cypress.env("AWS_COGNITO_USER_POOL_ID")} \
  --username ${email}`);
  cy.exec(`aws cognito-idp admin-set-user-password \
  --user-pool-id ${Cypress.env("AWS_COGNITO_USER_POOL_ID")} \
  --username ${email} \
  --password ${Cypress.env("PASSWORD")} \
  --permanent`);
});

Cypress.Commands.add(
  "addNormalUserToSpecificGroup",
  (email: string, group: string) => {
    cy.exec(`aws cognito-idp admin-add-user-to-group \
  --user-pool-id ${Cypress.env("AWS_COGNITO_USER_POOL_ID")} \
  --username ${email} \
  --group-name ${group}`);
  }
);

Cypress.Commands.add("createAdminUserWithPassword", (email: string) => {
  cy.createNormalUserWithPassword(email);
  cy.addNormalUserToSpecificGroup(email, "admin");
});
