import { SQSHandler } from "aws-lambda";
import { S3, SNS } from "aws-sdk";

import SendTextMessageSQSEvent from "./interfaces/SendTextMessageSQSEvent";
import { generateTextMessageFromTemplate } from "@common/notificationsSending/utils";

const s3 = new S3();
const sns = new SNS();

const handler: SQSHandler = async (event, context, callback) => {
  try {
    console.log("Extracting data from the event...");

    const {
      template,
      locale,
      phoneNumber,
      replacements,
    }: SendTextMessageSQSEvent = JSON.parse(event.Records[0].body);

    console.log("Generating text message template...");

    const generatedTextMessage = await generateTextMessageFromTemplate(
      s3,
      template,
      replacements,
      locale
    );

    console.log("Sending text message...");

    await sns
      .publish({ PhoneNumber: phoneNumber, Message: generatedTextMessage })
      .promise();

    callback(null);
  } catch (e) {
    console.error(e);
    callback(e);
  }
};

exports.handler = handler;
