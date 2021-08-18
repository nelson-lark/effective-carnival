import { adminPageSelectors } from "../selectors/admin-page";

export const adminPage = {
  checkIfMessageIsVisibleInFirstRow: (message: string) => {
    cy.getByDataTestId(adminPageSelectors.feedbackTableDescriptionBodyCell)
      .first()
      .contains(message);
  },
} as const;
