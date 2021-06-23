import * as cdk from "@aws-cdk/core";

import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";

import path from "path";

import { applyTagsToResource } from "@utils/functions";

import { EnvName } from "@enums/EnvName";
import { ServicePurpose } from "@enums/ServicePurpose";

interface EmailSendingProps {
  envName: EnvName;
}

export class EmailSendingCdkConstruct extends cdk.Construct {
  public readonly emailTemplatesBucket: s3.Bucket;

  constructor(
    scope: cdk.Construct,
    id: string,
    { envName }: EmailSendingProps
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

    // ========================================================================
    // Resource: AWS S3 Deployment
    // ========================================================================

    // Purpose: Deploys email templates to the correct bucket

    const bucketDeployment = new s3deploy.BucketDeployment(
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

    applyTagsToResource([bucketDeployment, this.emailTemplatesBucket], {
      envName,
      purpose: ServicePurpose.EmailMessaging,
    });
  }
}
