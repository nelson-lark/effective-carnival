import { authSelectors } from "../selectors/auth-selectors";

export const verifyEmailPage = {
  checkThatResendButtonIsEnabled: () => {
    cy.getByDataTestId(authSelectors.resendEmailButton).should("be.enabled");
  },
} as const;
