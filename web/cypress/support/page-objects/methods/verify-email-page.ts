import { verifyEmailPageSelectors } from "../selectors/verify-email-page";

export const verifyEmailPage = {
  checkThatResendButtonIsEnabled: () => {
    cy.getByDataTestId(verifyEmailPageSelectors.resendEmailButton).should(
      "be.enabled"
    );
  },
} as const;
