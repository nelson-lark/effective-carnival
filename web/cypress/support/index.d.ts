import { Credentials } from "./interfaces/Credentials";

// Add all your custom global commands to the "Chainable" interface
declare global {
  namespace Cypress {
    interface Chainable {
      loginAs({ email, password }: Partial<Credentials>): Chainable<Element>;
      setLanguage(language: string): Chainable<Element>;
      clickOn(selector: string): Chainable<Element>;
      checkRadioButton(selector: string): Chainable<Element>;
      checkValidation(validationText: string): Chainable<Element>;
      signOutFromApp(): Chainable<Element>;
      fillInputField(selector: string, value: string): Chainable<Element>;
      clearInputField(selector: string): Chainable<Element>;
      checkThatSubpageURLContains(specificPage: string): Chainable<Element>;
      confirmUserSignUp(email: string): Chainable<Element>;
      createUserWithPassword(email: string): Chainable<Element>;
      addUserToSpecificGroup(email: string, group: string): Chainable<Element>;
      createAdminWithPassword(email: string): Chainable<Element>;
      getByDataTestId(selector: string, ...args: any[]): Chainable<Element>;
    }
  }
}
