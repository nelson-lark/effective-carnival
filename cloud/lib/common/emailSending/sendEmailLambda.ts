import { SQSHandler } from "aws-lambda";
import { S3, SES } from "aws-sdk";

import SendEmailSQSEvent from "./interfaces/SendEmailSQSEvent";
import { generateEmailFromTemplate } from "@common/emailSending/utils";

import nodemailer from "nodemailer";

const s3 = new S3();
const ses = new SES();

const transporter = nodemailer.createTransport({
  SES: ses,
});

const handler: SQSHandler = async (event, context, callback) => {
  try {
    console.log("Extracting data from the event...");

    const {
      template,
      locale,
      addressTo,
      replacements,
      subject,
    }: SendEmailSQSEvent = JSON.parse(event.Records[0].body);

    console.log("Generating email template...");

    const reformedReplacements: [RegExp, string][] = replacements
      ? [...replacements, [/%EMAILADDRESS%/, addressTo]]
      : [[/%EMAILADDRESS%/, addressTo]];

    const generatedEmail = await generateEmailFromTemplate(
      s3,
      template,
      reformedReplacements,
      locale
    );

    console.log("Sending email...");

    await transporter.sendMail({
      from: process.env.defaultSesSenderEmail!,
      to: addressTo,
      subject,
      html: generatedEmail,
    });

    callback(null);
  } catch (e) {
    console.error(e);
    callback(e);
  }
};

exports.handler = handler;
