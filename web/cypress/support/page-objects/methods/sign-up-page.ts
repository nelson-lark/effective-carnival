import { signUpPageSelectors } from "../selectors/sign-up-page";

export const signUpPage = {
  fillSignUpForm: (email: string, phone: string, password: string) => {
    cy.fillInputField(signUpPageSelectors.emailInput, email);
    cy.fillInputField(signUpPageSelectors.phoneInput, phone);
    cy.fillInputField(signUpPageSelectors.passwordInput, password);
  },
} as const;
