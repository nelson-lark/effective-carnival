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

interface NotificationsSendingProps {
  envName: EnvName;
  defaultSesSenderEmail: string;
  defaultDomain: string;
}

export class NotificationsSendingCdkConstruct extends cdk.Construct {
  public readonly notificationTemplatesTranslationsBucket: s3.Bucket;

  constructor(
    scope: cdk.Construct,
    id: string,
    { envName, defaultSesSenderEmail, defaultDomain }: NotificationsSendingProps
  ) {
    super(scope, id);

    // ========================================================================
    // Resource: AWS S3
    // ========================================================================

    // Purpose: Bucket for notification templates and translations

    this.notificationTemplatesTranslationsBucket = new s3.Bucket(
      this,
      `${envName}-EmailTemplatesBucket`,
      {
        bucketName: `${envName}-effective-carnival-email-templates`,
      }
    );

    // ========================================================================
    // Resource: AWS S3 Deployment
    // ========================================================================

    // Purpose: Deploys email templates to the correct bucket

    const notificationTemplatesTranslationsBucketDeployment =
      new s3deploy.BucketDeployment(this, `${envName}-BucketDeployment`, {
        destinationBucket: this.notificationTemplatesTranslationsBucket,
        sources: [
          s3deploy.Source.asset(
            path.join(__dirname, "../../authorization/notificationResources")
          ),
        ],
      });

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

    // Purpose: Hold unsuccessful send text messages
    const sendTextMessageDeadLetterQueue = new sqs.Queue(
      this,
      `${envName}-SendTextMessageDeadLetterQueue`,
      {
        queueName: `${envName}-SendTextMessageDeadLetterQueue`,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      }
    );

    // Purpose: Queue for sending text messages not related to authorization
    const sendTextMessageQueue = new sqs.Queue(
      this,
      `${envName}-SendTextMessageQueue`,
      {
        queueName: `${envName}-SendTextMessageQueue`,
        deadLetterQueue: {
          maxReceiveCount: 1,
          queue: sendTextMessageDeadLetterQueue,
        },
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      }
    );

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
          notificationTemplatesTranslationsBucketName:
            this.notificationTemplatesTranslationsBucket.bucketName,
          defaultSesSenderEmail: defaultSesSenderEmail,
          defaultDomain: defaultDomain,
        },
        functionName: `${envName}-SendEmailLambda`,
        initialPolicy: [
          new iam.PolicyStatement({
            actions: ["s3:ListBucket", "s3:GetObject"],
            effect: iam.Effect.ALLOW,
            resources: [
              `${this.notificationTemplatesTranslationsBucket.bucketArn}`,
              `${this.notificationTemplatesTranslationsBucket.bucketArn}/*`,
            ],
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

    // Purpose: Handle text message sending

    const sendTextMessageLambda = new NodejsFunction(
      this,
      `${envName}-sendTextMessageLambda`,
      {
        entry: path.join(__dirname, "./sendTextMessageLambda.ts"),
        environment: {
          notificationTemplatesTranslationsBucketName:
            this.notificationTemplatesTranslationsBucket.bucketName,
        },
        functionName: `${envName}-SendTextMessageLambda`,
        initialPolicy: [
          new iam.PolicyStatement({
            actions: ["s3:ListBucket", "s3:GetObject"],
            effect: iam.Effect.ALLOW,
            resources: [
              `${this.notificationTemplatesTranslationsBucket.bucketArn}`,
              `${this.notificationTemplatesTranslationsBucket.bucketArn}/*`,
            ],
          }),
          new iam.PolicyStatement({
            actions: ["sns:Publish"],
            effect: iam.Effect.ALLOW,
            resources: ["*"],
          }),
        ],
        handler: "handler",
        runtime: DEFAULT_LAMBDA_RUNTIME,
      }
    );

    sendTextMessageLambda.addEventSource(
      new SqsEventSource(sendTextMessageQueue, { batchSize: 1 })
    );

    applyTagsToResource(
      [
        notificationTemplatesTranslationsBucketDeployment,
        this.notificationTemplatesTranslationsBucket,
        sendEmailQueue,
        sendEmailLambda,
        sendTextMessageQueue,
        sendTextMessageLambda,
      ],
      {
        envName,
        purpose: ServicePurpose.NotificationSending,
      }
    );
  }
}
