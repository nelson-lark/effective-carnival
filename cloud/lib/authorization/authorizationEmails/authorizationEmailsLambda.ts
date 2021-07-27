import { S3 } from "aws-sdk";

import { CustomMessageTriggerHandler } from "aws-lambda";

import { CognitoMessageTriggerSource } from "@enums/CognitoMessageTriggerSource";
import { generateEmailFromTemplate } from "@common/emailSending/utils";

const s3 = new S3();

/**
 * Helper function, which generates link with email & code
 * @param eventType   - Type of event to handle
 * @param email       - Email address
 * @param code        - Code
 */
export const generateCodeLink = (
  eventType: CognitoMessageTriggerSource,
  email: string,
  code: string
): string => {
  const { defaultDomain } = process.env;

  console.log(`Forming URL for event: ${eventType}`);

  const path = (() => {
    switch (eventType) {
      case CognitoMessageTriggerSource.ForgotPassword:
        return "create-new-password";
      case CognitoMessageTriggerSource.SignUp:
      case CognitoMessageTriggerSource.ResendCode:
        return "confirm-signup";
    }
  })();

  return `https://${defaultDomain}/${path}?username=${encodeURIComponent(
    email
  )}&code=${code}`;
};

export const handler: CustomMessageTriggerHandler = async (
  event,
  context,
  callback
) => {
  try {
    const triggerSource = event.triggerSource as CognitoMessageTriggerSource;
    if (
      [
        CognitoMessageTriggerSource.SignUp,
        CognitoMessageTriggerSource.ResendCode,
      ].includes(triggerSource)
    ) {
      if (event.request.userAttributes.email_verified === "true") {
        callback(new Error("User already verified"), event);
        return;
      }
      const {
        request: {
          codeParameter,
          userAttributes: { email, locale },
        },
      } = event;

      const activationLink = generateCodeLink(
        triggerSource,
        email,
        codeParameter
      );

      event.response.emailSubject = "Effective carnival | Verify account";
      event.response.emailMessage = await generateEmailFromTemplate(
        s3,
        "emailVerification",
        [
          [/%EMAILADDRESS%/, email],
          [/%ACTIVATION%/g, activationLink],
        ],
        locale
      );
    } else if (triggerSource === CognitoMessageTriggerSource.ForgotPassword) {
      const {
        request: {
          codeParameter,
          userAttributes: { email, locale },
        },
      } = event;

      const resetLink = generateCodeLink(triggerSource, email, codeParameter);

      event.response.emailSubject = "Effective carnival | Reset password";
      event.response.emailMessage = await generateEmailFromTemplate(
        s3,
        "resetPassword",
        [
          [/%EMAILADDRESS%/, email],
          [/%RESETPASSWORD%/g, resetLink],
        ],
        locale
      );
    }
  } catch (e) {
    console.log(
      `Error occurred while fetching event ${event.triggerSource}. I am going to send default Email message!`
    );
    console.error(e);
  }

  callback(null, event);
};

exports.customMessageTriggerHandler = handler;
