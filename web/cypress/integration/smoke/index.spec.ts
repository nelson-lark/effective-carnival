import { indexPage } from "../../support/page-objects/methods/index-page";

describe("Index page test suite", () => {
  before(() => {
    cy.visit("/");
  });

  context("User is able to navigate through the side menu", () => {
    it("User is able to open settings page", () => {
      indexPage.openSideMenu();
      indexPage.clickSettingsButton();
      indexPage.checkIfSideMenuIsClosed();
      cy.checkThatSubpageURLContains("/settings");
    });

    it("User is able to open and close the side menu on settings page", () => {
      indexPage.openSideMenu();
      indexPage.checkIfSideMenuIsOpened();
      indexPage.closeSideMenu();
      indexPage.checkIfSideMenuIsClosed();
    });

    it("User is able to open help page", () => {
      indexPage.openSideMenu();
      indexPage.clickHelpButton();
      indexPage.checkIfSideMenuIsClosed();
      cy.checkThatSubpageURLContains("/help");
    });

    it("User is able to open and close the side menu on help page", () => {
      indexPage.openSideMenu();
      indexPage.checkIfSideMenuIsOpened();
      indexPage.closeSideMenu();
      indexPage.checkIfSideMenuIsClosed();
    });

    it("User is able to click menu app logo to be redirected to index page", () => {
      indexPage.openSideMenu();
      indexPage.clickLogo();
      indexPage.checkIfSideMenuIsClosed();
      cy.checkThatSubpageURLContains("/");
    });

    it("User is able to open and close the side menu on index page", () => {
      indexPage.openSideMenu();
      indexPage.checkIfSideMenuIsOpened();
      indexPage.closeSideMenu();
      indexPage.checkIfSideMenuIsClosed();
    });

    it("User is moved back to index page when he tries to open verify-email page without email", () => {
      cy.visit("/verify-email");
      cy.checkThatSubpageURLContains("/");
    });
  });

  context("User is able to use the top bar to navigate to new pages", () => {
    it("User is able to click app logo to be redirected to index page from Settings page", () => {
      indexPage.openSideMenu();
      indexPage.clickSettingsButton();
      indexPage.checkIfSideMenuIsClosed();
      cy.checkThatSubpageURLContains("/settings");
      indexPage.clickLogo();
      cy.checkThatSubpageURLContains("/");
    });

    it("User is able to click app logo to be redirected to index page from Help page", () => {
      indexPage.openSideMenu();
      indexPage.clickHelpButton();
      indexPage.checkIfSideMenuIsClosed();
      cy.checkThatSubpageURLContains("/help");
      indexPage.clickLogo();
      cy.checkThatSubpageURLContains("/");
    });

    it("User is able to open sing in page", () => {
      indexPage.clickSignInButtonOnAppBar();
      cy.checkThatSubpageURLContains("/sign-in");
    });
  });
});
