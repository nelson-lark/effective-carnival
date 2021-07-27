import { createRandomUser } from "../../support/generate-data";
import { indexPage } from "../../support/page-objects/methods/index-page";
import { settingsPage } from "../../support/page-objects/methods/settings-page";
import { settingsPageSelectors } from "../../support/page-objects/selectors/settings-page";

const user = createRandomUser();

describe("Settings page test suite", () => {
  before(() => {
    cy.setLanguage("en");
    cy.visit("/sign-in");
    cy.createUserWithPassword(user.correctEmail);
    cy.loginAs({
      email: user.correctEmail,
      password: user.correctPassword,
    });
    indexPage.openSideMenu();
    indexPage.clickSettingsButton();
    indexPage.checkIfSideMenuIsClosed();
    cy.checkThatSubpageURLContains("/settings");
  });

  it("User is able to change the language of the app", () => {
    cy.clickOn(settingsPageSelectors.changeLanguageButton);
    cy.clickOn(settingsPageSelectors.changeLanguageToArButton);
    settingsPage.checkIfLanguageIsChanged("عربى");
    cy.clickOn(settingsPageSelectors.changeLanguageButton);
    cy.clickOn(settingsPageSelectors.changeLanguageToPlButton);
    settingsPage.checkIfLanguageIsChanged("Polski");
    cy.clickOn(settingsPageSelectors.changeLanguageButton);
    cy.clickOn(settingsPageSelectors.changeLanguageToEnButton);
    settingsPage.checkIfLanguageIsChanged("English");
  });

  it("User is able to change the text from LTR to RTL", () => {
    cy.checkRadioButton(settingsPageSelectors.rtlRadioButton);
    settingsPage.checkIfRadioButtonIsChecked(
      settingsPageSelectors.rtlRadioButton
    );
    cy.checkRadioButton(settingsPageSelectors.ltrRadioButton);
    settingsPage.checkIfRadioButtonIsChecked(
      settingsPageSelectors.ltrRadioButton
    );
  });
});
