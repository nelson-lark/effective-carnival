import validatePhoneNumber from "@utils/validation/validatePhoneNumber";

describe("validatePhoneNumber", () => {
  it("should return true when correct number format was provided", () => {
    expect(validatePhoneNumber()("+48123456789")).toBeTruthy();
  });

  it("should return false when incorrect number format was provided", () => {
    expect(validatePhoneNumber()("123123123")).toBeFalsy();
  });

  it("should return false when there is no input", () => {
    expect(validatePhoneNumber()()).toBeFalsy();
  });
});
