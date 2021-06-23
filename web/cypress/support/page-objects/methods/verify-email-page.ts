import { verifyEmailPageSelectors } from "../selectors/verify-email-page";

export const verifyEmailPage = {
  checkThatResendButtonIsDisabled: () => {
    cy.getByDataTestId(verifyEmailPageSelectors.resendEmailButton).should(
      "be.disabled"
    );
  },
} as const;
