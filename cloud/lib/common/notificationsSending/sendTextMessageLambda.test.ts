import LambdaTester from "lambda-tester";
import AWSMock from "aws-sdk-mock";

import { SQSEvent } from "aws-lambda";

jest.mock("./utils", () => ({
  generateTextMessageFromTemplate: jest.fn().mockResolvedValue("%APP%"),
}));

describe("sendTextMessageLambda", () => {
  const event: SQSEvent = {
    Records: [
      {
        body: JSON.stringify({
          template: "welcome",
          locale: "en",
          phoneNumber: "+4411222333444",
          replacements: [[/%APP%/, "TestApplication"]],
        }),
        messageId: "1",
        receiptHandle: "",
        attributes: {
          ApproximateReceiveCount: "",
          SentTimestamp: "",
          SenderId: "",
          ApproximateFirstReceiveTimestamp: "",
        },
        md5OfBody: "",
        eventSource: "",
        eventSourceARN: "",
        awsRegion: "",
        messageAttributes: {},
      },
    ],
  };

  it("should send sms message", async () => {
    AWSMock.setSDKInstance(require("aws-sdk"));
    AWSMock.mock("SNS", "publish", "test-message");
    const module = await import("./sendTextMessageLambda");

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await LambdaTester(module.handler).event(event).expectResult();
  });
});
