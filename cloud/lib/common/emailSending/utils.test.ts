// eslint-disable-next-line @typescript-eslint/no-var-requires
import AWSMock from "aws-sdk-mock";

// eslint-disable-next-line @typescript-eslint/no-var-requires
AWSMock.setSDKInstance(require("aws-sdk"));
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
import { generateEmailFromTemplate } from "@common/emailSending/utils";
import { S3 } from "aws-sdk";

describe("generateEmailFromTemplate()", () => {
  it("should properly grab and replace values in template", async () => {
    process.env.defaultDomain = "codeandpepper.com";
    process.env.emailTemplatesBucketName = "templatesBucketName";
    process.env.emailTranslatedTextsBucketName = "translationsBucketName";
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
});
