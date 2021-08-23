import { indexPageSelectors } from "../selectors/index-page";

export const indexPage = {
  checkIfSideMenuIsOpened: () => {
    cy.getByDataTestId(indexPageSelectors.sideMenuDrawerContainer, {
      timeout: 500,
    }).should("be.visible");
  },
  checkIfSideMenuIsClosed: () => {
    cy.getByDataTestId(indexPageSelectors.sideMenuDrawerContainer, {
      timeout: 500,
    }).should("not.exist");
  },
  checkIfUserAvatarIsVisible: () => {
    cy.getByDataTestId(indexPageSelectors.userAvatarButton).should(
      "be.visible"
    );
  },
} as const;
