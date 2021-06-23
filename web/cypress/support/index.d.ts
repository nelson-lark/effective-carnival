import { Credentials } from "./interfaces/Credentials";

// Add all your custom global commands to the "Chainable" interface
declare global {
  namespace Cypress {
    interface Chainable {
      loginAs({ email, password }: Partial<Credentials>): Chainable<Element>;
      clickOn(selector: string): Chainable<Element>;
      checkValidation(validationText: string): Chainable<Element>;
      signOutFromApp(): Chainable<Element>;
      fillInputField(selector: string, value: string): Chainable<Element>;
      clearInputField(selector: string): Chainable<Element>;
      checkThatSubpageURLContains(specificPage: string): Chainable<Element>;
      confirmUserSignUp(email: string): Chainable<Element>;
      createNormalUserWithPassword(email: string): Chainable<Element>;
      addNormalUserToSpecificGroup(
        email: string,
        group: string
      ): Chainable<Element>;
      createAdminUserWithPassword(email: string): Chainable<Element>;
      getByDataTestId(selector: string, ...args: any[]): Chainable<Element>;
      getByDataTestIdLike(selector: string, ...args: any[]): Chainable<Element>;
    }
  }
}
