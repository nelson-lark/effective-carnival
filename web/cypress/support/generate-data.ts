import faker from "faker";

export const createRandomUser = () => ({
  correctEmail: `success+${faker.datatype.number(
    999999
  )}@simulator.amazonses.com`,
  correctPhone: faker.phone.phoneNumber("+48 79# ### ###"),
  correctPassword: Cypress.env("PASSWORD"),
  wrongEmail: faker.lorem.words(1),
  wrongPhone: faker.phone.phoneNumber(),
  tooShortPassword: faker.internet.password(9, false, /^[A-Za-z]*$/, "8Aa"),
  tooLongPassword: faker.internet.password(81, false, /^[A-Za-z]*$/, "8Aa"),
  onlyLowerCaseLettersPassword: faker.internet.password(10, false, /^[a-z]*$/),
  onlyUpperCaseLettersPassword: faker.internet.password(10, false, /^[A-Z]*$/),
  withoutDigitsPassword: faker.internet.password(10, false, /^[A-Za-z]*$/),
});

export const createRandomMessage = () => ({
  message: `${faker.address.country()}`,
});
