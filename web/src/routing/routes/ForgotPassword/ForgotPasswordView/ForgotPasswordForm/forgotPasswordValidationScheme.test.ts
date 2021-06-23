import forgotPasswordValidationScheme from "./forgotPasswordValidationSchema";

describe("forgotPasswordValidationScheme()", () => {
  it("should accept correct input data", () => {
    expect(
      forgotPasswordValidationScheme().validateSync({
        email: "test@test.com",
      })
    ).toBeTruthy();
  });

  it("should throw on incorrect input data", () => {
    expect(() =>
      forgotPasswordValidationScheme().validateSync({
        email: "incorrectEmail.com",
      })
    ).toThrow();
  });
});
