import { sendFeedbackSelectors } from "../selectors/send-feedback";

export const sendFeedback = {
  modalIsVisible: () => {
    cy.getByDataTestId(sendFeedbackSelectors.modalContainer).should(
      "be.visible"
    );
  },
  modalIsNotVisible: () => {
    cy.getByDataTestId(sendFeedbackSelectors.modalContainer).should(
      "not.exist"
    );
  },
  clickOnCancelButton: () => {
    cy.getByDataTestId(sendFeedbackSelectors.cancelButton).click();
  },
  clickOnSendButton: () => {
    cy.getByDataTestId(sendFeedbackSelectors.sendButton).click();
  },
  typeMessage: (text: string) => {
    cy.getByDataTestId(sendFeedbackSelectors.textareaInput).type(text);
  },
} as const;
