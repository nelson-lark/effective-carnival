import createNewPasswordValidationScheme from "./createNewPasswordValidationScheme";

describe("accepts correct form input data", () => {
  it("should have correct password", () => {
    expect(() =>
      createNewPasswordValidationScheme().validateSync({
        password: "Test1234567",
        retypePassword: "Test1234567",
      })
    ).toBeTruthy();
  });
  it("should throw because password doesn't match", () => {
    expect(() =>
      createNewPasswordValidationScheme().validateSync({
        password: "1234tesT1234",
        retypePassword: "1234testT1234",
      })
    ).toThrow();
  });

  it("should throw because there is no upperCases", () => {
    expect(() =>
      createNewPasswordValidationScheme().validateSync({
        password: "1234test1234",
        retypePassword: "1234test1234",
      })
    ).toThrow();
  });
  it("should throw because there is no lowerCases", () => {
    expect(() =>
      createNewPasswordValidationScheme().validateSync({
        password: "1234TEST1234",
        retypePassword: "1234TEST1234",
      })
    ).toThrow();
  });
});
