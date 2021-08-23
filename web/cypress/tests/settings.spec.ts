import { indexPageSelectors } from "../support/page-objects/selectors/index-page";
import { createRandomUser } from "../support/generate-data";
import { indexPage } from "../support/page-objects/methods/index-page";
import { settingsPage } from "../support/page-objects/methods/settings-page";
import { settingsPageSelectors } from "../support/page-objects/selectors/settings-page";

const user = createRandomUser();

describe("Settings page test suite", () => {
  before(() => {
    cy.setLanguage("en");
    cy.visit("/sign-in");
    cy.createUserWithPassword(user.correctEmail);
    cy.loginAs(user.correctEmail, user.correctPassword);
    cy.clickOn(indexPageSelectors.openButtonInSideMenu);
    cy.clickOn(indexPageSelectors.settingsButtonInSideMenu);
    indexPage.checkIfSideMenuIsClosed();
    cy.checkThatSubpageURLContains("/settings");
  });

  it("User is able to change the language of the app", () => {
    cy.clickOn(settingsPageSelectors.changeLanguageButton);
    cy.clickOn(settingsPageSelectors.changeLanguageToArButton);
    cy.containText(settingsPageSelectors.changeLanguageButton, "عربى");
    cy.clickOn(settingsPageSelectors.changeLanguageButton);
    cy.clickOn(settingsPageSelectors.changeLanguageToPlButton);
    cy.containText(settingsPageSelectors.changeLanguageButton, "Polski");
    cy.clickOn(settingsPageSelectors.changeLanguageButton);
    cy.clickOn(settingsPageSelectors.changeLanguageToEnButton);
    cy.containText(settingsPageSelectors.changeLanguageButton, "English");
  });

  it("User is able to change the text from LTR to RTL", () => {
    cy.clickOn(settingsPageSelectors.rtlRadioButton);
    settingsPage.checkIfRadioButtonIsChecked(
      settingsPageSelectors.rtlRadioButton
    );
    cy.clickOn(settingsPageSelectors.ltrRadioButton);
    settingsPage.checkIfRadioButtonIsChecked(
      settingsPageSelectors.ltrRadioButton
    );
  });
});
