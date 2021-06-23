import * as cdk from "@aws-cdk/core";

import { GitHubSourceCodeProviderProps } from "@aws-cdk/aws-amplify/lib/source-code-providers";

import { DataLakeCdkConstruct } from "@analytics/dataLakeCdkConstruct";
import { PinpointCdkConstruct } from "@analytics/pinpointCdkConstruct";
import { CognitoCdkConstruct } from "@authorization/cognitoCdkConstruct";
import { AmplifyCdkConstruct } from "@common/amplifyCdkConstruct";
import { AppSyncCdkConstruct } from "@common/appSyncCdkConstruct";
import { EmailSendingCdkConstruct } from "@common/emailSending/emailSendingCdkConstruct";

import { EnvName } from "@enums/EnvName";

interface SingleEnvironmentProps {
  envName: EnvName;
  repository: GitHubSourceCodeProviderProps;
}

export class CloudStack extends cdk.Stack {
  constructor(
    scope: cdk.Construct,
    id: string,
    {
      envName,
      repository,
      ...stackProps
    }: cdk.StackProps & SingleEnvironmentProps
  ) {
    super(scope, id, stackProps);

    // Create Amplify application
    const { defaultDomain, policyForAmplifyCiCd } = new AmplifyCdkConstruct(
      this,
      `${envName}-Amplify`,
      {
        envName,
        repository,
      }
    );

    // Data Lake with Kinesis Data Firehose
    new DataLakeCdkConstruct(this, `${envName}-DataLake`, {
      envName,
      policyForAmplifyCiCd,
    });

    // Pinpoint construct
    const { pinpointArn } = new PinpointCdkConstruct(
      this,
      `${envName}-Pinpoint`,
      {
        envName,
      }
    );

    // Email sending
    const { emailTemplatesBucket } = new EmailSendingCdkConstruct(
      this,
      `${envName}-EmailSending`,
      {
        envName,
      }
    );

    // Whole cognito setup with Pinpoint
    const { userPool } = new CognitoCdkConstruct(
      this,
      `${envName}-CognitoPinpoint`,
      {
        defaultDomain,
        envName,
        pinpointArn,
        emailTemplatesBucket,
      }
    );

    // GraphQL API with Lambdas
    new AppSyncCdkConstruct(this, `${envName}-AppsyncGraphQlApi`, {
      envName,
      userPool,
    });
  }
}
