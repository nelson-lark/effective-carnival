import { S3 } from "aws-sdk";

import { CustomMessageTriggerHandler } from "aws-lambda";

import { CognitoMessageTriggerSource } from "@enums/CognitoMessageTriggerSource";

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

/**
 * Helper function, which grabs email template from S3 and supplies data to it
 * @param templateName  - Name of the template in S3
 * @param customReplace - Array of [replaceFrom, replaceTo] tuples
 */
export const generateEmailFromTemplate = async (
  templateName: string,
  customReplace: [RegExp, string][]
): Promise<string> => {
  const { bucketName, defaultDomain } = process.env;

  const objectParams = {
    Bucket: bucketName!,
    Key: `${templateName}.html`,
  };
  console.log(`Trying to grab ${templateName} template`);
  const emailTemplateRaw = await s3.getObject(objectParams).promise();

  console.log("Replacing values in the template");

  const feLink = `https://${defaultDomain}`;

  let emailContent = emailTemplateRaw
    .Body!.toString()
    .replace(/%FRONTEND%/g, feLink);

  for (const [key, value] of customReplace) {
    emailContent = emailContent.replace(key, value);
  }

  return emailContent;
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
          userAttributes: { email },
        },
      } = event;

      const activationLink = generateCodeLink(
        triggerSource,
        email,
        codeParameter
      );

      event.response.emailSubject = "EffectiveCarnival | Verify account";
      event.response.emailMessage = await generateEmailFromTemplate(
        "emailVerification",
        [[/%ACTIVATION%/g, activationLink]]
      );
    } else if (triggerSource === CognitoMessageTriggerSource.ForgotPassword) {
      const {
        request: {
          codeParameter,
          userAttributes: { email },
        },
      } = event;

      const resetLink = generateCodeLink(triggerSource, email, codeParameter);

      event.response.emailSubject = "EffectiveCarnival | Reset password";
      event.response.emailMessage = await generateEmailFromTemplate(
        "resetPassword",
        [[/%RESETPASSWORD%/g, resetLink]]
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
