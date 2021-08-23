import {
  createRandomMessage,
  createRandomUser,
} from "../support/generate-data";
import { sendFeedback } from "../support/page-objects/methods/send-feedback";
import { indexPage } from "../support/page-objects/methods/index-page";
import { indexPageSelectors } from "../support/page-objects/selectors/index-page";
import { sendFeedbackSelectors } from "../support/page-objects/selectors/send-feedback-modal";
import { feedbacksTableSelectors } from "../support/page-objects/selectors/feedbacks-page";

const admin = createRandomUser();
const user = createRandomUser();
const userMessage = createRandomMessage();

describe("Send feedback test suite", () => {
  before(() => {
    cy.setLanguage("en");
    cy.visit("/sign-in");
    cy.createUserWithPassword(user.correctEmail);
    cy.loginAs(user.correctEmail, user.correctPassword);
  });

  it("User is not able to send feedback via modal when description is missing", () => {
    cy.clickOn(indexPageSelectors.openButtonInSideMenu);
    cy.clickOn(indexPageSelectors.sendFeedbackButtonInSideMenu);
    indexPage.checkIfSideMenuIsClosed();
    sendFeedback.modalIsVisible();
    cy.clickOn(sendFeedbackSelectors.cancelButton);
    sendFeedback.modalIsNotVisible();
    cy.clickOn(indexPageSelectors.openButtonInSideMenu);
    cy.clickOn(indexPageSelectors.sendFeedbackButtonInSideMenu);
    sendFeedback.modalIsVisible();
    cy.clickOn(sendFeedbackSelectors.sendButton);
    cy.checkValidation("Description is a required field");
    cy.clickOn(sendFeedbackSelectors.cancelButton);
  });

  it("User is able to send feedback via modal when description is filled", () => {
    cy.clickOn(indexPageSelectors.openButtonInSideMenu);
    cy.clickOn(indexPageSelectors.sendFeedbackButtonInSideMenu);
    indexPage.checkIfSideMenuIsClosed();
    sendFeedback.modalIsVisible();
    cy.typeText(sendFeedbackSelectors.textareaInput, userMessage.message);
    cy.clickOn(sendFeedbackSelectors.sendButton);
    cy.signOut();
    cy.checkThatSubpageURLContains("/sign-in");
  });

  it("Admin is able to see the new feedback on the list", () => {
    cy.createAdminWithPassword(admin.correctEmail);
    cy.loginAs(admin.correctEmail, admin.correctPassword);
    cy.clickOn(indexPageSelectors.openButtonInSideMenu);
    cy.clickOn(indexPageSelectors.feedbacksButtonInSideMenu);
    cy.checkThatSubpageURLContains("/admin");
    cy.containText(
      feedbacksTableSelectors.feedbackTableDescriptionBodyCell,
      userMessage.message
    );
  });
});
