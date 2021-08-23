import { sendFeedbackSelectors } from "../selectors/send-feedback-modal";

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
} as const;
