import AWS from "aws-sdk";
import * as AWSMock from "aws-sdk-mock";

import LambdaTester from "lambda-tester";

const cognitoUserMock = {
  UserAttributes: [
    {
      Name: "General Kenobi",
      Value: "o.kenobi@jedi-order.gr",
    },
  ],
};

const eventMock = {
  PK: "HELLO#THERE",
  message: "Hello there!",
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
AWSMock.setSDKInstance(require("aws-sdk"));

AWSMock.mock("CognitoIdentityServiceProvider", "adminGetUser", () =>
  Promise.resolve(cognitoUserMock)
);

AWSMock.mock("S3", "putObject", (params: AWS.S3.Types.PutObjectRequest) => {
  expect(params.Bucket).toEqual("s3bucket");
  return Promise.resolve("success");
});

process.env.PREVIEW_URL = "https://preview.pdf";
process.env.PDF_S3_BUCKET = "s3bucket";

import {
  convertPdfPayloadJsonToBase64Query,
  generatePdf,
  handler,
  uploadFileToS3,
} from "./pdfGeneratorLambda";

describe("pdfGeneratorLambda", () => {
  describe("convertPdfPayloadJsonToBase64Query", () => {
    it("should properly convert object to base64", () => {
      const base64 = convertPdfPayloadJsonToBase64Query(eventMock);

      expect(base64).toEqual(
        "eyJQSyI6IkhFTExPI1RIRVJFIiwibWVzc2FnZSI6IkhlbGxvIHRoZXJlISJ9"
      );
    });
  });

  describe("uploadFileToS3", () => {
    it("should properly upload pdf", async () => {
      const uploadResult = await uploadFileToS3(
        Buffer.from("test", "utf8"),
        "testFile"
      );

      expect(uploadResult).toEqual("success");
    });
  });

  describe("handler", () => {
    it("should properly generate and save pdf", async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      generatePdf = jest.fn(() => Promise.resolve(Buffer.from("test", "utf8")));

      await LambdaTester(handler)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .event({ Records: [{ body: JSON.stringify(eventMock) }] })
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .expectResult();
    });
  });
});
