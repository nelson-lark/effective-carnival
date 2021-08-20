import { commonSelectors } from "../selectors/common-selectors";
import { signUpPageSelectors } from "../selectors/sign-up-page";

export const signUpPage = {
  fillSignUpForm: (email: string, phone: string, password: string) => {
    cy.fillInputField(signUpPageSelectors.emailInput, email);
    cy.fillInputField(signUpPageSelectors.phoneInput, phone);
    cy.fillInputField(signUpPageSelectors.passwordInput, password);
    cy.fillInputField(signUpPageSelectors.confirmPasswordInput, password);
  },

  clickOnShowPasswordIcon: () => {
    cy.getByDataTestId(commonSelectors.showPasswordButton).first().click();
  },

  clickOnShowConfirmPasswordIcon: () => {
    cy.getByDataTestId(commonSelectors.showPasswordButton).last().click();
  },
} as const;
