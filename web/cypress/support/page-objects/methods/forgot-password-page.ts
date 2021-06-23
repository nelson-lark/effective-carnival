import { forgotPasswordPageSelectors } from "../selectors/forgot-password-page";

export const forgotPasswordPage = {
  fillForgotPasswordForm: (email: string) => {
    cy.getByDataTestId(forgotPasswordPageSelectors.emailInput)
      .clear()
      .type(email);
  },
  submitForgotPasswordForm: () => {
    cy.clickOn(forgotPasswordPageSelectors.resetPasswordButton);
  },
} as const;
