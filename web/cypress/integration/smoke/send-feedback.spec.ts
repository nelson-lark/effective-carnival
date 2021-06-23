import {
  createRandomMessage,
  createRandomUser,
} from "cypress/support/generate-data";
import { adminPage } from "cypress/support/page-objects/methods/admin-page";
import { sendFeedback } from "cypress/support/page-objects/methods/send-feedback";
import { indexPage } from "../../support/page-objects/methods/index-page";

const normalUser = createRandomUser();
const adminUser = createRandomUser();
const normalUserMessage = createRandomMessage();

describe("Send feedback test suite", () => {
  before(() => {
    cy.visit("/sign-in");
    cy.createNormalUserWithPassword(normalUser.correctEmail);
    cy.loginAs({
      email: normalUser.correctEmail,
      password: normalUser.correctPassword,
    });
  });

  it("User is not able to send feedback via modal when description is missing", () => {
    indexPage.openSideMenu();
    indexPage.clickSendFeedbackButton();
    indexPage.checkIfSideMenuIsClosed();
    sendFeedback.modalIsVisible();
    sendFeedback.clickOnCancelButton();
    sendFeedback.modalIsNotVisible();
    indexPage.openSideMenu();
    indexPage.clickSendFeedbackButton();
    sendFeedback.modalIsVisible();
    sendFeedback.clickOnSendButton();
    cy.checkValidation("Description is a required field");
    sendFeedback.clickOnCancelButton();
  });

  it("User is able to send feedback via modal when description is filled", () => {
    indexPage.openSideMenu();
    indexPage.clickSendFeedbackButton();
    indexPage.checkIfSideMenuIsClosed();
    sendFeedback.modalIsVisible();
    sendFeedback.typeMessage(normalUserMessage.message);
    sendFeedback.clickOnSendButton();
    cy.signOutFromApp();
  });

  it("Admin is able to see the new feedback on the list", () => {
    cy.createAdminUserWithPassword(adminUser.correctEmail);
    cy.loginAs({
      email: adminUser.correctEmail,
      password: adminUser.correctPassword,
    });
    indexPage.openSideMenu();
    indexPage.clickAdminButton();
    cy.checkThatSubpageURLContains("/admin");
    adminPage.checkIfUserMessageIsShown(normalUserMessage.message);
  });
});
