import * as cdk from "@aws-cdk/core";

import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import * as sqs from "@aws-cdk/aws-sqs";

import path from "path";

import { applyTagsToResource } from "@utils/functions";

import { EnvName } from "@enums/EnvName";
import { ServicePurpose } from "@enums/ServicePurpose";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import { SqsEventSource } from "@aws-cdk/aws-lambda-event-sources";
import * as iam from "@aws-cdk/aws-iam";
import { DEFAULT_LAMBDA_RUNTIME } from "@consts/index";

interface EmailSendingProps {
  envName: EnvName;
  defaultSesSenderEmail: string;
  defaultDomain: string;
}

export class EmailSendingCdkConstruct extends cdk.Construct {
  public readonly emailTemplatesBucket: s3.Bucket;
  public readonly emailTranslatedTextsBucket: s3.Bucket;

  constructor(
    scope: cdk.Construct,
    id: string,
    { envName, defaultSesSenderEmail, defaultDomain }: EmailSendingProps
  ) {
    super(scope, id);

    // ========================================================================
    // Resource: AWS S3
    // ========================================================================

    // Purpose: Bucket, where emailTemplates are kept

    this.emailTemplatesBucket = new s3.Bucket(
      this,
      `${envName}-EmailTemplatesBucket`,
      {
        bucketName: `${envName}-effective-carnival-email-templates`,
      }
    );

    // Purpose: Bucket for email translated texts

    this.emailTranslatedTextsBucket = new s3.Bucket(
      this,
      `${envName}-EmailTranslatedTextsBucket`,
      {
        bucketName: `${envName}-effective-carnival-email-translated-texts`,
      }
    );

    // ========================================================================
    // Resource: AWS S3 Deployment
    // ========================================================================

    // Purpose: Deploys email templates to the correct bucket

    const templatesBucketDeployment = new s3deploy.BucketDeployment(
      this,
      `${envName}-BucketDeployment`,
      {
        destinationBucket: this.emailTemplatesBucket,
        sources: [
          s3deploy.Source.asset(
            path.join(__dirname, "../../authorization/emailTemplates")
          ),
        ],
      }
    );

    // Purpose: Deploys email translated texts to the correct bucket

    const translatedTextsBucketDeployment = new s3deploy.BucketDeployment(
      this,
      `${envName}-TranslatedTextsBucketDeployment`,
      {
        destinationBucket: this.emailTranslatedTextsBucket,
        sources: [
          s3deploy.Source.asset(
            path.join(__dirname, "../../authorization/emailTranslatedTexts")
          ),
        ],
      }
    );

    // ========================================================================
    // Resource: AWS SQS
    // ========================================================================

    // Purpose: Hold unsuccessful send email messages
    const sendEmailDeadLetterQueue = new sqs.Queue(
      this,
      `${envName}-SendEmailDeadLetterQueue`,
      {
        queueName: `${envName}-SendEmailDeadLetterQueue`,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      }
    );

    // Purpose: Queue for sending emails not related to authorization
    const sendEmailQueue = new sqs.Queue(this, `${envName}-SendEmailQueue`, {
      queueName: `${envName}-SendEmailQueue`,
      deadLetterQueue: { maxReceiveCount: 1, queue: sendEmailDeadLetterQueue },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // ========================================================================
    // Resource: AWS Lambda
    // ========================================================================

    // Purpose: Handle email sending

    const sendEmailLambda = new NodejsFunction(
      this,
      `${envName}-sendEmailLambda`,
      {
        entry: path.join(__dirname, "./sendEmailLambda.ts"),
        environment: {
          emailTemplatesBucketName: this.emailTemplatesBucket.bucketName,
          emailTranslatedTextsBucketName:
            this.emailTranslatedTextsBucket.bucketName,
          defaultSesSenderEmail: defaultSesSenderEmail,
          defaultDomain: defaultDomain,
        },
        functionName: `${envName}-SendEmailLambda`,
        initialPolicy: [
          new iam.PolicyStatement({
            actions: ["s3:GetObject"],
            effect: iam.Effect.ALLOW,
            resources: [
              `${this.emailTemplatesBucket.bucketArn}/*`,
              `${this.emailTranslatedTextsBucket.bucketArn}/*`,
            ],
          }),
          new iam.PolicyStatement({
            actions: ["s3:ListBucket"],
            effect: iam.Effect.ALLOW,
            resources: [`${this.emailTranslatedTextsBucket.bucketArn}`],
          }),
          new iam.PolicyStatement({
            actions: ["ses:SendEmail", "ses:SendRawEmail"],
            effect: iam.Effect.ALLOW,
            resources: ["*"],
          }),
        ],
        handler: "handler",
        runtime: DEFAULT_LAMBDA_RUNTIME,
      }
    );

    sendEmailLambda.addEventSource(
      new SqsEventSource(sendEmailQueue, { batchSize: 1 })
    );

    applyTagsToResource(
      [
        templatesBucketDeployment,
        translatedTextsBucketDeployment,
        this.emailTemplatesBucket,
        this.emailTranslatedTextsBucket,
        sendEmailQueue,
        sendEmailLambda,
      ],
      {
        envName,
        purpose: ServicePurpose.EmailMessaging,
      }
    );
  }
}
