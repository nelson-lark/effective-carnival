import LambdaTester from "lambda-tester";
import AWSMock from "aws-sdk-mock";

import { SQSEvent } from "aws-lambda";

AWSMock.mock("SES", "sendRawEmail", () => Promise.resolve());

jest.mock("nodemailer", () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockReturnValue(() => Promise.resolve("")),
  }),
}));

jest.mock("./utils", () => ({
  generateEmailFromTemplate: jest.fn().mockResolvedValue("html"),
}));

describe("sendEmailLambda", () => {
  const event: SQSEvent = {
    Records: [
      {
        body: JSON.stringify({
          template: "cashDepositApproved",
          locale: "en",
          addressTo: "investor@test.com",
          replacements: [
            [/%AMOUNT%/, "3000.00"],
            [/%CURRENCY%/, "$"],
          ],
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

  beforeAll(() => {
    process.env.defaultSesSenderEmail = "test@test.com";
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    AWSMock.setSDKInstance(require("aws-sdk"));
  });

  it("should send email", async () => {
    const module = await import("./sendEmailLambda");

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await LambdaTester(module.handler).event(event).expectResult();
  });
});
