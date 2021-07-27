import { indexPage } from "../../support/page-objects/methods/index-page";

describe("Index page test suite", () => {
  before(() => {
    cy.setLanguage("en");
    cy.visit("/");
  });

  context("User is able to navigate through the side menu", () => {
    it("User is able to open settings page and open/close side menu there", () => {
      indexPage.openSideMenu();
      indexPage.clickSettingsButton();
      indexPage.checkIfSideMenuIsClosed();
      cy.checkThatSubpageURLContains("/settings");
      indexPage.openSideMenu();
      indexPage.checkIfSideMenuIsOpened();
      indexPage.closeSideMenu();
      indexPage.checkIfSideMenuIsClosed();
    });

    it("User is able to open help page and open/close side menu there", () => {
      indexPage.openSideMenu();
      indexPage.clickHelpButton();
      indexPage.checkIfSideMenuIsClosed();
      cy.checkThatSubpageURLContains("/help");
      indexPage.openSideMenu();
      indexPage.checkIfSideMenuIsOpened();
      indexPage.closeSideMenu();
      indexPage.checkIfSideMenuIsClosed();
    });

    it("User is able to open index page and open/close side menu there", () => {
      indexPage.openSideMenu();
      indexPage.clickLogoInSideMenu();
      indexPage.checkIfSideMenuIsClosed();
      indexPage.openSideMenu();
      indexPage.checkIfSideMenuIsOpened();
      indexPage.closeSideMenu();
      indexPage.checkIfSideMenuIsClosed();
    });
  });

  context("User is able to use the top bar to navigate to new pages", () => {
    it("User is able to click app logo to be redirected to index page from Settings page", () => {
      indexPage.openSideMenu();
      indexPage.clickSettingsButton();
      indexPage.checkIfSideMenuIsClosed();
      cy.checkThatSubpageURLContains("/settings");
      indexPage.clickLogoInTopAppBar();
    });

    it("User is able to click app logo to be redirected to index page from Help page", () => {
      indexPage.openSideMenu();
      indexPage.clickHelpButton();
      indexPage.checkIfSideMenuIsClosed();
      cy.checkThatSubpageURLContains("/help");
      indexPage.clickLogoInTopAppBar();
    });

    it("User is able to open sing in page", () => {
      indexPage.clickSignInButtonOnAppBar();
      cy.checkThatSubpageURLContains("/sign-in");
    });
  });
});
