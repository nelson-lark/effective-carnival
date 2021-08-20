export const signInPage = {
  checkThatPasswordFieldContainsCorrectValue: (
    selector: string,
    password: string
  ) => {
    cy.getByDataTestId(selector).should("have.value", password);
    cy.getByDataTestId(selector).invoke("attr", "type").should("eq", "text");
  },
  checkThatPasswordIsNotVisible: (selector: string) => {
    cy.getByDataTestId(selector)
      .invoke("attr", "type")
      .should("eq", "password");
  },
} as const;
