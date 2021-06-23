import { adminPageSelectors } from "../selectors/admin-page";

export const adminPage = {
  checkIfUserMessageIsShown: (message: string) => {
    cy.getByDataTestId(adminPageSelectors.feedbackTableBody).contains(message);
  },
} as const;
