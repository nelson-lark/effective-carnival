import chromium from "chrome-aws-lambda";

import { S3 } from "aws-sdk";

import { SQSHandler } from "aws-lambda";

const { PREVIEW_URL, PDF_S3_BUCKET } = process.env;

const s3Client = new S3();

export const handler: SQSHandler = async (event, context, callback) => {
  try {
    const { body } = event.Records[0];
    const eventData = JSON.parse(body);

    const buffer = await generatePdf(
      convertPdfPayloadJsonToBase64Query(eventData)
    );

    await uploadFileToS3(buffer, `${eventData.id}.pdf`);

    callback(null);
  } catch (e) {
    callback(e);
  }
};

export const convertPdfPayloadJsonToBase64Query = (
  pdfPayload: unknown
): string =>
  encodeURIComponent(
    Buffer.from(JSON.stringify(pdfPayload)).toString("base64")
  );

export const generatePdf = async (
  base64PdfPayload: string
): Promise<Buffer> => {
  let browser = null;
  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();

    await page.goto(`${PREVIEW_URL!}?data=${base64PdfPayload}`, {
      waitUntil: "networkidle2",
    });

    return await page.pdf({
      displayHeaderFooter: false,
      format: "a4",
      printBackground: true,
      margin: {
        left: "0px",
        top: "0px",
        right: "0px",
        bottom: "0px",
      },
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

export const uploadFileToS3 = (
  body: Buffer,
  fileName: string
): Promise<S3.Types.PutObjectOutput> =>
  s3Client
    .putObject({
      Body: body,
      Bucket: PDF_S3_BUCKET!,
      Key: fileName,
    })
    .promise();

exports.handler = handler;
