import { S3 } from "aws-sdk";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { interpolation } = require("interpolate-json");

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
  const {
    emailTemplatesBucketName,
    emailTranslatedTextsBucketName,
    defaultDomain,
  } = process.env;

  const templateParams = {
    Bucket: emailTemplatesBucketName!,
    Key: `${templateName}.html`,
  };
  console.log(`Trying to grab ${templateName} template`);
  const emailTemplateRaw = await s3.getObject(templateParams).promise();

  const translationParams = {
    Bucket: emailTranslatedTextsBucketName!,
    Key: `${locale}/${templateName}.json`,
  };
  console.log(`Trying to grab ${locale}/${templateName} translation`);
  let emailTranslation = await s3.getObject(translationParams).promise();
  if (!emailTranslation.Body)
    emailTranslation = await s3
      .getObject({
        Bucket: emailTranslatedTextsBucketName!,
        Key: `en/${templateName}.json`,
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
