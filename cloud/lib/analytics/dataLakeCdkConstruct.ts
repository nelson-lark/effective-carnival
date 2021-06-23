import * as cdk from "@aws-cdk/core";

import * as s3 from "@aws-cdk/aws-s3";
import * as iam from "@aws-cdk/aws-iam";
import * as kinesisfirehose from "@aws-cdk/aws-kinesisfirehose";

import { applyTagsToResource } from "@utils/functions";

import { EnvName } from "@enums/EnvName";
import { ServicePurpose } from "@enums/ServicePurpose";

interface DataLakeProps {
  envName: EnvName;
  policyForAmplifyCiCd: iam.ManagedPolicy;
}

export class DataLakeCdkConstruct extends cdk.Construct {
  private readonly stream: kinesisfirehose.CfnDeliveryStream;

  constructor(
    scope: cdk.Construct,
    id: string,
    { envName, policyForAmplifyCiCd }: DataLakeProps
  ) {
    super(scope, id);

    // ========================================================================
    // Resource: AWS S3
    // ========================================================================

    // Purpose: Data lake e.g. for Pinpint events

    const bucket = new s3.Bucket(this, `${envName}-Bucket`, {
      bucketName: `${envName}-effective-carnival-data-lake-bucket`,
    });

    // ========================================================================
    // Resource: Amazon Kinesis Data Firehose policies
    // ========================================================================

    // Purpose: IAM roles for S3 destination
    // https://docs.aws.amazon.com/firehose/latest/dev/controlling-access.html#using-iam-s3

    const policy = new iam.ManagedPolicy(
      this,
      `${envName}-ManagedPolicyForKinesisDataFirehoseS3Destination`,
      {
        statements: [
          new iam.PolicyStatement({
            actions: [
              "s3:AbortMultipartUpload",
              "s3:GetBucketLocation",
              "s3:GetObject",
              "s3:ListBucket",
              "s3:ListBucketMultipartUploads",
              "s3:PutObject",
            ],
            effect: iam.Effect.ALLOW,
            resources: [bucket.bucketArn, `${bucket.bucketArn}/*`],
          }),
        ],
      }
    );

    const role = new iam.Role(
      this,
      `${envName}-RoleForKinesisDataFirehoseS3Destination`,
      {
        assumedBy: new iam.ServicePrincipal("firehose.amazonaws.com"),
        managedPolicies: [policy],
      }
    );

    // ========================================================================
    // Resource: Amazon Kinesis Data Firehose
    // ========================================================================

    // Purpose: Load Pinpoint events into S3 data lake

    // https://docs.aws.amazon.com/pinpoint/latest/developerguide/permissions-streams.html
    this.stream = new kinesisfirehose.CfnDeliveryStream(
      this,
      `${envName}-DeliveryStream`,
      {
        deliveryStreamName: `${envName}-PinpointToS3DeliveryStream`,
        s3DestinationConfiguration: {
          bucketArn: bucket.bucketArn,
          roleArn: role.roleArn,
        },
      }
    );

    // Amplify policy needs to be updated first (s3:PutBucketTagging)
    bucket.node.addDependency(policyForAmplifyCiCd);
    applyTagsToResource([bucket, this.stream], {
      envName,
      purpose: ServicePurpose.Analytics,
    });
  }

  /**
   * Returns Kinesis Data Firehose Delivery Stream's ARN
   */
  get streamArn(): string {
    return this.stream.attrArn;
  }
}
