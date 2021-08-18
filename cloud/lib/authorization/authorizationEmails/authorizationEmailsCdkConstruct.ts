import * as cdk from "@aws-cdk/core";

import * as iam from "@aws-cdk/aws-iam";
import * as lambda from "@aws-cdk/aws-lambda-nodejs";
import * as s3 from "@aws-cdk/aws-s3";

import * as path from "path";

import { IFunction } from "@aws-cdk/aws-lambda";

import { DEFAULT_LAMBDA_RUNTIME } from "@consts/index";

import { applyTagsToResource } from "@utils/functions";

import { EnvName } from "@enums/EnvName";
import { ServicePurpose } from "@enums/ServicePurpose";

interface EmailTemplatesProps {
  defaultDomain: string;
  envName: EnvName;
  notificationTemplatesTranslationsBucket: s3.Bucket;
}

export class AuthorizationEmailsCdkConstruct extends cdk.Construct {
  public messageFunction: IFunction;

  constructor(
    scope: cdk.Construct,
    id: string,
    {
      defaultDomain,
      envName,
      notificationTemplatesTranslationsBucket,
    }: EmailTemplatesProps
  ) {
    super(scope, id);

    // ========================================================================
    // Resource: AWS Lambda
    // ========================================================================

    // Purpose: Function, which is invoked by Cognito while sending email

    this.messageFunction = new lambda.NodejsFunction(
      this,
      `${envName}-InterceptCognitoLambda`,
      {
        entry: path.join(__dirname, "./authorizationEmailsLambda.ts"),
        environment: {
          notificationTemplatesTranslationsBucketName:
            notificationTemplatesTranslationsBucket.bucketName,
          defaultDomain,
        },
        handler: "customMessageTriggerHandler",
        initialPolicy: [
          new iam.PolicyStatement({
            actions: ["s3:ListBucket", "s3:GetObject"],
            effect: iam.Effect.ALLOW,
            resources: [
              `${notificationTemplatesTranslationsBucket.bucketArn}`,
              `${notificationTemplatesTranslationsBucket.bucketArn}/*`,
            ],
          }),
        ],
        runtime: DEFAULT_LAMBDA_RUNTIME,
      }
    );

    applyTagsToResource([this.messageFunction], {
      envName,
      purpose: ServicePurpose.Authorization,
    });
  }
}
