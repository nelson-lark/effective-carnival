import { signInPageSelectors } from "../selectors/sign-in-page";

export const signInPage = {
  checkThatPasswordFieldContainsCorrectValue: (password: string) => {
    cy.getByDataTestId(signInPageSelectors.passwordInput).should(
      "have.value",
      password
    );
    cy.getByDataTestId(signInPageSelectors.passwordInput)
      .invoke("attr", "type")
      .should("eq", "text");
  },
  checkThatPasswordIsNotVisible: () => {
    cy.getByDataTestId(signInPageSelectors.passwordInput)
      .invoke("attr", "type")
      .should("eq", "password");
  },
} as const;
