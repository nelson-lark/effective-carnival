import AWSMock from "aws-sdk-mock";
import { S3 } from "aws-sdk";

import {
  generateTextMessageFromTemplate,
  generateEmailFromTemplate,
} from "@common/notificationsSending/utils";

// eslint-disable-next-line @typescript-eslint/no-var-requires
AWSMock.setSDKInstance(require("aws-sdk"));

describe("generateTextMessageFromTemplate()", () => {
  beforeAll(() => {
    AWSMock.setSDKInstance(require("aws-sdk"));
    AWSMock.mock("S3", "getObject", () => {
      return Promise.resolve({
        Body: Buffer.from(
          "Welcome to the %APP%! We are glad to see you on board!",
          "utf8"
        ),
      });
    });
  });

  it("should properly grab and replace values in template", async () => {
    process.env.notificationTemplatesTranslationsBucketName = "bucketName";
    const s3 = new S3();
    const finalTemplate = await generateTextMessageFromTemplate(
      s3,
      "test",
      [[/%APP%/, "TestApplication"]],
      "en"
    );

    expect(finalTemplate).toContain("TestApplication");
  });

  afterAll(() => AWSMock.restore());
});

describe("generateEmailFromTemplate()", () => {
  beforeAll(() => {
    AWSMock.mock("S3", "getObject", (args: S3.Types.GetObjectRequest) => {
      if (args.Key.endsWith(".html"))
        return Promise.resolve({
          Body: Buffer.from(
            "${title} %FRONTEND% %ACTIVATION% %RESETPASSWORD%",
            "utf8"
          ),
        });
      else if (args.Key.endsWith(".json"))
        return Promise.resolve({ Body: Buffer.from('{"title":"Test title"}') });
      else throw new Error("Update the test");
    });
  });

  it("should properly grab and replace values in template", async () => {
    process.env.defaultDomain = "codeandpepper.com";
    process.env.notificationTemplatesTranslationsBucketName = "bucketName";
    const s3 = new S3();
    const finalTemplate = await generateEmailFromTemplate(
      s3,
      "test",
      [
        [/%ACTIVATION%/g, "codeandpepper.activate"],
        [/%RESETPASSWORD%/g, "codeandpepper.reset"],
      ],
      "en"
    );

    expect(finalTemplate).toContain("Test title");
    expect(finalTemplate).toContain("https://codeandpepper.com");
    expect(finalTemplate).toContain("codeandpepper.activate");
    expect(finalTemplate).toContain("codeandpepper.reset");
  });

  afterAll(() => AWSMock.restore());
});
