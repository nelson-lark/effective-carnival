import { settingsPageSelectors } from "../selectors/settings-page";

export const settingsPage = {
  checkIfLanguageIsChanged: (message: string) => {
    cy.getByDataTestId(settingsPageSelectors.changeLanguageButton).contains(
      message
    );
  },
  checkIfRadioButtonIsChecked: (selector: string) => {
    cy.getByDataTestId(selector).should("be.checked");
  },
} as const;
