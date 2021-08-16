import * as cdk from "@aws-cdk/core";

import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import * as sqs from "@aws-cdk/aws-sqs";

import path from "path";

import { SqsEventSource } from "@aws-cdk/aws-lambda-event-sources";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";

import { DEFAULT_LAMBDA_RUNTIME } from "@consts/index";
import { applyTagsToResource } from "@utils/functions";

import { EnvName } from "@enums/EnvName";
import { ServicePurpose } from "@enums/ServicePurpose";

interface PdfGeneratorProps {
  envName: EnvName;
}

export class PdfGeneratorCdkConstruct extends cdk.Construct {
  public readonly pdfGenerationQueue: sqs.Queue;

  constructor(
    scope: cdk.Construct,
    id: string,
    { envName }: PdfGeneratorProps
  ) {
    super(scope, id);

    // ========================================================================
    // Resource: AWS S3 Bucket
    // ========================================================================

    // Purpose: Bucket for PDFs

    const pdfBucket = new s3.Bucket(this, `${envName}-PdfBucket`, {
      bucketName: `${envName}-pdf-bucket`,
    });

    // Purpose: Serving PDF preview pages
    const pdfPreviewBucket = new s3.Bucket(
      this,
      `${envName}-PdfPreviewBucket`,
      {
        bucketName: `${envName}-pdf-preview-bucket`,
        publicReadAccess: true,
        websiteErrorDocument: "index.html",
        websiteIndexDocument: "index.html",
      }
    );

    // ========================================================================
    // Resource: AWS CloudFront Distribution
    // ========================================================================

    // Purpose: CDN for serving PDF preview pages
    const pdfGeneratorDistribution = new cloudfront.Distribution(
      this,
      `${envName}-PdfPreviewDistribution`,
      {
        defaultBehavior: { origin: new origins.S3Origin(pdfPreviewBucket) },
        priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      }
    );

    // ========================================================================
    // Resource: AWS Lambda
    // ========================================================================

    // Purpose: Deploys PdfGenerator files to proper bucket
    const pdfS3Deployer = new s3deploy.BucketDeployment(
      this,
      `${envName}-PdfPreviewDeployment`,
      {
        sources: [s3deploy.Source.asset("../pdfGenerator/build")],
        destinationBucket: pdfPreviewBucket,
        distribution: pdfGeneratorDistribution,
        distributionPaths: ["/static/js/*.js"],
      }
    );

    // ========================================================================
    // Resource: AWS SQS
    // ========================================================================

    // Purpose: Queue with messages containing invoice PDF generation requests

    const pdfGenerationQueueDeadLetter = new sqs.Queue(
      this,
      `${envName}-PdfGenerationDeadLetterQueue`,
      {
        queueName: `${envName}-PdfGenerationDeadLetterQueue`,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      }
    );

    this.pdfGenerationQueue = new sqs.Queue(
      this,
      `${envName}-PdfGenerationQueue`,
      {
        deadLetterQueue: {
          queue: pdfGenerationQueueDeadLetter,
          maxReceiveCount: 5,
        },
        queueName: `${envName}-PdfGenerationQueue`,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      }
    );

    // ========================================================================
    // Resource: AWS Lambda
    // ========================================================================

    // Purpose: Generate invoice PDF
    const pdfGeneratorLambda = new NodejsFunction(
      this,
      `${envName}-pdfGeneratorLambda`,
      {
        bundling: {
          nodeModules: ["chrome-aws-lambda", "puppeteer-core"],
        },
        entry: path.join(__dirname, "./pdfGeneratorLambda.ts"),
        environment: {
          PREVIEW_URL: `https://${pdfGeneratorDistribution.domainName}/invoice`,
          PDF_S3_BUCKET: pdfBucket.bucketName,
        },
        functionName: `${envName}-pdfGeneratorLambda`,
        handler: "handler",
        memorySize: 2048,
        runtime: DEFAULT_LAMBDA_RUNTIME,
        timeout: cdk.Duration.seconds(15),
      }
    );

    pdfGeneratorLambda.addEventSource(
      new SqsEventSource(this.pdfGenerationQueue, { batchSize: 1 })
    );

    pdfBucket.grantPut(pdfGeneratorLambda);

    applyTagsToResource(
      [
        pdfGeneratorLambda,
        pdfBucket,
        this.pdfGenerationQueue,
        pdfPreviewBucket,
        pdfGeneratorDistribution,
        pdfGenerationQueueDeadLetter,
        pdfS3Deployer,
      ],
      {
        envName,
        purpose: ServicePurpose.PdfGeneration,
      }
    );

    // ========================================================================
    // Exports
    // ========================================================================

    new cdk.CfnOutput(this, `${envName}-PdfGeneratorUrlExport`, {
      exportName: `${envName}-pdfGeneratorUrl`,
      value: `https://${pdfGeneratorDistribution.domainName}`,
    });
  }
}
