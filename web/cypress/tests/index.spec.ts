import { indexPageSelectors } from "../support/page-objects/selectors/index-page";
import { indexPage } from "../support/page-objects/methods/index-page";
import { createRandomUser } from "../support/generate-data";

const admin = createRandomUser();

describe("Index page test suite", () => {
  before(() => {
    cy.setLanguage("en");
    cy.visit("/sign-in");
    cy.createAdminWithPassword(admin.correctEmail);
    cy.loginAs(admin.correctEmail, admin.correctPassword);
  });

  context("User is able to navigate through the side menu", () => {
    it("User is able to open feedbacks page and open/close side menu there", () => {
      cy.clickOn(indexPageSelectors.openButtonInSideMenu);
      cy.clickOn(indexPageSelectors.feedbacksButtonInSideMenu);
      indexPage.checkIfSideMenuIsClosed();
      cy.checkThatSubpageURLContains("/admin-feedbacks");
      cy.clickOn(indexPageSelectors.openButtonInSideMenu);
      indexPage.checkIfSideMenuIsOpened();
      cy.clickOn(indexPageSelectors.closeButtonInSideMenu);
      indexPage.checkIfSideMenuIsClosed();
    });

    it("User is able to open users managment page and open/close side menu there", () => {
      cy.clickOn(indexPageSelectors.openButtonInSideMenu);
      cy.clickOn(indexPageSelectors.usersManagmentButtonInSideMenu);
      indexPage.checkIfSideMenuIsClosed();
      cy.checkThatSubpageURLContains("/admin-users-and-groups");
      cy.clickOn(indexPageSelectors.openButtonInSideMenu);
      indexPage.checkIfSideMenuIsOpened();
      cy.clickOn(indexPageSelectors.closeButtonInSideMenu);
      indexPage.checkIfSideMenuIsClosed();
    });

    it("User is able to open settings page and open/close side menu there", () => {
      cy.clickOn(indexPageSelectors.openButtonInSideMenu);
      cy.clickOn(indexPageSelectors.settingsButtonInSideMenu);
      indexPage.checkIfSideMenuIsClosed();
      cy.checkThatSubpageURLContains("/settings");
      cy.clickOn(indexPageSelectors.openButtonInSideMenu);
      indexPage.checkIfSideMenuIsOpened();
      cy.clickOn(indexPageSelectors.closeButtonInSideMenu);
      indexPage.checkIfSideMenuIsClosed();
    });

    it("User is able to open help page and open/close side menu there", () => {
      cy.clickOn(indexPageSelectors.openButtonInSideMenu);
      cy.clickOn(indexPageSelectors.helpButtonInSideMenu);
      indexPage.checkIfSideMenuIsClosed();
      cy.checkThatSubpageURLContains("/help");
      cy.clickOn(indexPageSelectors.openButtonInSideMenu);
      indexPage.checkIfSideMenuIsOpened();
      cy.clickOn(indexPageSelectors.closeButtonInSideMenu);
      indexPage.checkIfSideMenuIsClosed();
    });

    it("User is able to open index page and open/close side menu there", () => {
      cy.clickOn(indexPageSelectors.openButtonInSideMenu);
      cy.clickOn(indexPageSelectors.logoLinkInSideMenu);
      indexPage.checkIfSideMenuIsClosed();
      cy.clickOn(indexPageSelectors.openButtonInSideMenu);
      indexPage.checkIfSideMenuIsOpened();
      cy.clickOn(indexPageSelectors.closeButtonInSideMenu);
      indexPage.checkIfSideMenuIsClosed();
    });
  });

  context("User is able to use the top bar to navigate to new pages", () => {
    it("User is able to click app logo to be redirected to index page from Feedbcks page", () => {
      cy.clickOn(indexPageSelectors.openButtonInSideMenu);
      cy.clickOn(indexPageSelectors.feedbacksButtonInSideMenu);
      indexPage.checkIfSideMenuIsClosed();
      cy.checkThatSubpageURLContains("/admin-feedbacks");
      cy.clickOn(indexPageSelectors.logoLinkInTopAppBar);
    });

    it("User is able to click app logo to be redirected to index page from Feedbcks page", () => {
      cy.clickOn(indexPageSelectors.openButtonInSideMenu);
      cy.clickOn(indexPageSelectors.usersManagmentButtonInSideMenu);
      indexPage.checkIfSideMenuIsClosed();
      cy.checkThatSubpageURLContains("/admin-users-and-groups");
      cy.clickOn(indexPageSelectors.logoLinkInTopAppBar);
    });

    it("User is able to click app logo to be redirected to index page from Settings page", () => {
      cy.clickOn(indexPageSelectors.openButtonInSideMenu);
      cy.clickOn(indexPageSelectors.settingsButtonInSideMenu);
      indexPage.checkIfSideMenuIsClosed();
      cy.checkThatSubpageURLContains("/settings");
      cy.clickOn(indexPageSelectors.logoLinkInTopAppBar);
    });

    it("User is able to click app logo to be redirected to index page from Help page", () => {
      cy.clickOn(indexPageSelectors.openButtonInSideMenu);
      cy.clickOn(indexPageSelectors.helpButtonInSideMenu);
      indexPage.checkIfSideMenuIsClosed();
      cy.checkThatSubpageURLContains("/help");
      cy.clickOn(indexPageSelectors.logoLinkInTopAppBar);
    });
  });
});
