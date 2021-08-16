import { S3 } from "aws-sdk";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { interpolation } = require("interpolate-json");

/**
 * Helper function, which grabs translated text message and supplies data to it
 * @param s3 - S3 instance for api calls
 * @param templateName  - Name of the template in S3
 * @param replacements - Array of [replaceFrom, replaceTo] tuples
 * @param locale - preferred user language
 */
export const generateTextMessageFromTemplate = async (
  s3: S3,
  templateName: string,
  replacements: [RegExp, string][],
  locale: string
): Promise<string> => {
  const { notificationTemplatesTranslationsBucketName } = process.env;

  const translationParams = {
    Bucket: notificationTemplatesTranslationsBucketName!,
    Key: `translatedTextMessages/${locale}/${templateName}.txt`,
  };
  console.log(
    `Trying to grab translatedTextMessages/${locale}/${templateName} translation`
  );

  let textMessageTranslation = await s3.getObject(translationParams).promise();
  if (!textMessageTranslation.Body)
    textMessageTranslation = await s3
      .getObject({
        Bucket: notificationTemplatesTranslationsBucketName!,
        Key: `translatedTextMessages/en/${templateName}.txt`,
      })
      .promise();

  console.log("Replacing values in the template");

  let textMessageContent = textMessageTranslation.Body!.toString();

  if (replacements)
    for (const [key, value] of replacements) {
      textMessageContent = textMessageContent.replace(key, value);
    }

  return textMessageContent;
};

/**
 * Helper function, which grabs email template and translation from S3 and supplies data to it
 * @param s3 - S3 instance for api calls
 * @param templateName  - Name of the template in S3
 * @param reformedReplacements - Array of [replaceFrom, replaceTo] tuples
 * @param locale - preferred user language
 */
export const generateEmailFromTemplate = async (
  s3: S3,
  templateName: string,
  reformedReplacements: [RegExp, string][],
  locale: string
): Promise<string> => {
  const { notificationTemplatesTranslationsBucketName, defaultDomain } =
    process.env;

  const templateParams = {
    Bucket: notificationTemplatesTranslationsBucketName!,
    Key: `emailTemplates/${templateName}.html`,
  };
  console.log(`Trying to grab ${templateName} template`);
  const emailTemplateRaw = await s3.getObject(templateParams).promise();

  const translationParams = {
    Bucket: notificationTemplatesTranslationsBucketName!,
    Key: `emailTranslatedTexts/${locale}/${templateName}.json`,
  };
  console.log(`Trying to grab ${locale}/${templateName} translation`);
  let emailTranslation = await s3.getObject(translationParams).promise();
  if (!emailTranslation.Body)
    emailTranslation = await s3
      .getObject({
        Bucket: notificationTemplatesTranslationsBucketName!,
        Key: `emailTranslatedTexts/en/${templateName}.json`,
      })
      .promise();

  console.log("Replacing values in the template");

  const feLink = `https://${defaultDomain}`;

  let emailContent = emailTemplateRaw
    .Body!.toString()
    .replace(/%FRONTEND%/g, feLink);

  for (const [key, value] of reformedReplacements) {
    emailContent = emailContent.replace(key, value);
  }
  emailContent = interpolation.expand(
    emailContent,
    JSON.parse(emailTranslation.Body!.toString())
  );

  return emailContent;
};
