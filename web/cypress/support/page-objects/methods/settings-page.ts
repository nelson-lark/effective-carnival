export const settingsPage = {
  checkIfRadioButtonIsChecked: (selector: string) => {
    cy.getByDataTestId(selector).should("be.checked");
  },
} as const;
