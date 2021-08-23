// Add all your custom global commands to the "Chainable" interface
namespace Cypress {
  interface Chainable {
    fillSignUpForm(
      email: string,
      phone: string,
      password: string
    ): Chainable<Element>;
    loginAs(email: string, password: string): Chainable<Element>;
    signOut(): Chainable<Element>;
    setLanguage(language: string): Chainable<Element>;
    clickOn(selector: string): Chainable<Element>;
    typeText(selector: string, text: string): Chainable<Element>;
    containText(selector: string, text: string): Chainable<Element>;
    clearElement(selector: string): Chainable<Element>;
    checkValidation(validationText: string): Chainable<Element>;
    checkThatSubpageURLContains(specificPage: string): Chainable<Element>;
    getByDataTestId(selector: string, ...args: any[]): Chainable<Element>;
    confirmUserSignUp(email: string): Chainable<Element>;
    createUserWithPassword(email: string): Chainable<Element>;
    addUserToSpecificGroup(email: string, group: string): Chainable<Element>;
    createAdminWithPassword(email: string): Chainable<Element>;
  }
}
