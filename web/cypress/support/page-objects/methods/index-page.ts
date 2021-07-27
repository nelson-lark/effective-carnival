import { indexPageSelectors } from "../selectors/index-page";

export const indexPage = {
  openSideMenu: () => {
    cy.getByDataTestId(indexPageSelectors.sideMenuOpenButton).click();
  },
  closeSideMenu: () => {
    cy.getByDataTestId(indexPageSelectors.closeSideMenuButton).click();
  },
  clickSignInButtonOnAppBar: () => {
    cy.getByDataTestId(indexPageSelectors.signInButtonOnAppBar).click();
  },
  clickAdminButton: () => {
    cy.getByDataTestId(indexPageSelectors.adminButtonInSideMenu).click();
  },
  clickSettingsButton: () => {
    cy.getByDataTestId(indexPageSelectors.settingsButtonInSideMenu).click();
  },
  clickHelpButton: () => {
    cy.getByDataTestId(indexPageSelectors.helpButtonInSideMenu).click();
  },
  clickSendFeedbackButton: () => {
    cy.getByDataTestId(indexPageSelectors.sendFeedbackButtonInSideMenu).click();
  },
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
  clickLogoInTopAppBar: () => {
    cy.getByDataTestId(indexPageSelectors.logoLinkInTopAppBar).click();
  },
  clickLogoInSideMenu: () => {
    cy.getByDataTestId(indexPageSelectors.logoLinkInSideMenu).click();
  },
  checkIfUserAvatarIsVisible: () => {
    cy.getByDataTestId(indexPageSelectors.userAvatarButton).should(
      "be.visible"
    );
  },
  checkIfUserEmailIsShown: (email: string) => {
    cy.getByDataTestId(indexPageSelectors.userEmailInUserMenu).contains(email);
  },
} as const;
