import {
  createRandomMessage,
  createRandomUser,
} from "../../support/generate-data";
import { adminPage } from "../../support/page-objects/methods/admin-page";
import { sendFeedback } from "../../support/page-objects/methods/send-feedback";
import { indexPage } from "../../support/page-objects/methods/index-page";

const admin = createRandomUser();
const user = createRandomUser();
const userMessage = createRandomMessage();

describe("Send feedback test suite", () => {
  before(() => {
    cy.setLanguage("en");
    cy.visit("/sign-in");
    cy.createUserWithPassword(user.correctEmail);
    cy.loginAs({
      email: user.correctEmail,
      password: user.correctPassword,
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
    sendFeedback.typeMessage(userMessage.message);
    sendFeedback.clickOnSendButton();
    cy.signOutFromApp();
  });

  it("Admin is able to see the new feedback on the list", () => {
    cy.createAdminWithPassword(admin.correctEmail);
    cy.loginAs({
      email: admin.correctEmail,
      password: admin.correctPassword,
    });
    indexPage.openSideMenu();
    indexPage.clickAdminButton();
    cy.checkThatSubpageURLContains("/admin");
    adminPage.checkIfUserMessageIsShown(userMessage.message);
  });
});
