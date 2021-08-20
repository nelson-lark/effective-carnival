import { ValidationError } from "yup";

import signUpFormValidationSchema from "./signUpFormValidationSchema";

describe("signUpFormValidationSchema()", () => {
  it("should accept correct form input data", () => {
    expect(
      signUpFormValidationSchema().validateSync({
        email: "test@test.com",
        phone: "+48777888999",
        password: "testTEST1234!@#$",
        confirmPassword: "testTEST1234!@#$",
      })
    ).toBeTruthy();
  });

  it("should throw when incorrect email", () => {
    expect(() =>
      signUpFormValidationSchema().validateSync({
        email: "testtest.com",
        phone: "+48777888999",
        password: "testTEST1234!@#$",
        confirmPassword: "testTEST1234!@#$",
      })
    ).toThrow();
  });

  it("should throw when incorrect phone", () => {
    expect(() =>
      signUpFormValidationSchema().validateSync({
        email: "test@test.com",
        phone: "+487asd77888999",
        password: "testTEST1234!@#$",
        confirmPassword: "testTEST1234!@#$",
      })
    ).toThrow();
  });

  it("should throw when phone doesn't have prefix", () => {
    expect(() =>
      signUpFormValidationSchema().validateSync({
        email: "test@test.com",
        phone: "777888999",
        password: "testTEST1234!@#$",
        confirmPassword: "testTEST1234!@#$",
      })
    ).toThrow();
  });

  it("should throw when UK phone doesn't have prefix", () => {
    expect(() =>
      signUpFormValidationSchema().validateSync({
        email: "test@test.com",
        phone: "777888999",
        password: "testTEST1234!@#$",
        confirmPassword: "testTEST1234!@#$",
      })
    ).toThrow();
  });

  it("should throw when confirm password is not matching password", () => {
    expect(() =>
      signUpFormValidationSchema().validateSync({
        email: "test@test.com",
        phone: "+48777888999",
        password: "testTEST1234!@#$",
        confirmPassword: "testTEST1234!@#$11",
      })
    ).toThrow();
  });

  it("should throw when password without numbers", () => {
    expect(() =>
      signUpFormValidationSchema().validateSync({
        email: "testtest.com",
        phone: "+48777888999",
        password: "testadada!@#$",
        confirmPassword: "testadada!@#$",
      })
    ).toThrow();
  });

  it("should throw when password without upper cases", () => {
    expect(() =>
      signUpFormValidationSchema().validateSync({
        email: "testtest.com",
        phone: "+48777888999",
        password: "testadada12312!@#$",
        confirmPassword: "testadada12312!@#$",
      })
    ).toThrow();
  });

  it("should throw when password without lower cases", () => {
    expect(() =>
      signUpFormValidationSchema().validateSync({
        email: "testtest.com",
        phone: "+48777888999",
        password: "ADADAD1231!@#$",
        confirmPassword: "ADADAD1231!@#$",
      })
    ).toThrow();
  });

  it("should throw when password is too short", () => {
    expect(() =>
      signUpFormValidationSchema().validateSync({
        email: "testtest.com",
        phone: "+48777888999",
        password: "As1",
        confirmPassword: "As1",
      })
    ).toThrow();
  });

  it("should throw when email is too long", async () => {
    const emailSegment = "johndoe";

    expect(() =>
      signUpFormValidationSchema().validateSync({
        email: `${emailSegment.repeat(12)}@test.com`,
        phone: "+48777888999",
        password: "testTEST1234!@#$",
        confirmPassword: "testTEST1234!@#$",
      })
    ).toThrow(ValidationError);
  });
});
