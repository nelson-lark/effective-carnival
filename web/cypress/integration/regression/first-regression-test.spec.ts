import { createRandomUser } from "../../support/generate-data";

const firstUser = createRandomUser();

describe("First regression test suite", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Here you can implement your first regression test", () => {
    console.log(firstUser);
  });

  it("Here you can implement your second regression test", () => {
    //your code
  });
});
