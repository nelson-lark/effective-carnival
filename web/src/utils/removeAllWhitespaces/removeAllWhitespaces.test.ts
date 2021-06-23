import removeAllWhitespaces from "./removeAllWhitespaces";

describe("removeAllWhitespaces()", () => {
  it("should remove all whitespaces from string", () => {
    const test = removeAllWhitespaces(" t\n est ");
    expect(test).toEqual("test");
  });
});
