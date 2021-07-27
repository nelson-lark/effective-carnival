import * as AWSMock from "aws-sdk-mock";

import LambdaTester from "lambda-tester";

import { CustomMessageTriggerEvent } from "aws-lambda";

import { CognitoMessageTriggerSource } from "@enums/CognitoMessageTriggerSource";

// eslint-disable-next-line @typescript-eslint/no-var-requires
AWSMock.setSDKInstance(require("aws-sdk"));

jest.mock("../../common/emailSending/utils", () => ({
  generateEmailFromTemplate: jest
    .fn()
    .mockResolvedValue("https://codeandpepper.com"),
}));

import { generateCodeLink, handler } from "./authorizationEmailsLambda";

const basicEvent = {
  callerContext: { awsSdkVersion: "", clientId: "" },
  region: "",
  response: { emailMessage: "", emailSubject: "", smsMessage: "" },
  userName: "",
  userPoolId: "",
  version: "",
  request: {
    codeParameter: "123",
    userAttributes: { email: "test@test.com" },
    usernameParameter: "test",
  },
};

process.env.bucketName = "s3Bucket";
process.env.defaultDomain = "codeandpepper.com";

describe("authorizationEmailsLambda", () => {
  describe("generateCodeLink()", () => {
    it("should generate proper link for resetPassword email", () => {
      const link = generateCodeLink(
        CognitoMessageTriggerSource.ForgotPassword,
        "test@test.com",
        "123"
      );

      expect(link).toEqual(
        "https://codeandpepper.com/create-new-password?username=test%40test.com&code=123"
      );
    });

    it("should generate proper link for signUp email", () => {
      const link = generateCodeLink(
        CognitoMessageTriggerSource.SignUp,
        "test@test.com",
        "123"
      );

      expect(link).toEqual(
        "https://codeandpepper.com/confirm-signup?username=test%40test.com&code=123"
      );
    });

    it("should generate proper link for resendVerification email", () => {
      const link = generateCodeLink(
        CognitoMessageTriggerSource.ResendCode,
        "test@test.com",
        "123"
      );

      expect(link).toEqual(
        "https://codeandpepper.com/confirm-signup?username=test%40test.com&code=123"
      );
    });
  });

  describe("handler", () => {
    it(`should properly send ${CognitoMessageTriggerSource.ForgotPassword} email`, async () => {
      await LambdaTester(handler)
        .event({
          ...basicEvent,
          triggerSource: CognitoMessageTriggerSource.ForgotPassword,
        })
        .expectResult((result: CustomMessageTriggerEvent) => {
          expect(result.response.emailSubject).toEqual(
            "Effective carnival | Reset password"
          );
        });
    });

    it("shouldn't send email is user is already verified", async () => {
      await LambdaTester(handler)
        .event({
          ...basicEvent,
          triggerSource: CognitoMessageTriggerSource.ResendCode,
          request: {
            ...basicEvent.request,
            userAttributes: {
              ...basicEvent.request.userAttributes,
              email_verified: "true",
            },
          },
        })
        .expectError((error: Error) =>
          expect(error.message).toEqual("User already verified")
        );
    });

    [
      CognitoMessageTriggerSource.SignUp,
      CognitoMessageTriggerSource.ResendCode,
    ].forEach((eventName) => {
      it(`should properly send ${eventName} email`, async () => {
        await LambdaTester(handler)
          .event({
            ...basicEvent,
            triggerSource: eventName,
          })
          .expectResult((result: CustomMessageTriggerEvent) => {
            expect(result.response.emailSubject).toEqual(
              "Effective carnival | Verify account"
            );
          });
      });
    });
  });
});
