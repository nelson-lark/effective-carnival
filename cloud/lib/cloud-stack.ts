import * as cdk from "@aws-cdk/core";

import { GitHubSourceCodeProviderProps } from "@aws-cdk/aws-amplify/lib/source-code-providers";

import { DataLakeCdkConstruct } from "@analytics/dataLakeCdkConstruct";
import { PinpointCdkConstruct } from "@analytics/pinpointCdkConstruct";
import { CognitoCdkConstruct } from "@authorization/cognitoCdkConstruct";
import { AmplifyCdkConstruct } from "@common/amplifyCdkConstruct";
import { AppSyncCdkConstruct } from "@common/appSyncCdkConstruct";
import { NotificationsSendingCdkConstruct } from "@common/notificationsSending/notificationsSendingCdkConstruct";
import { getParameterFromParameterStore } from "@utils/functions";

import { EnvName } from "@enums/EnvName";

import { Parameters } from "@interfaces/Parameters";

interface SingleEnvironmentProps {
  envName: EnvName;
  repository: GitHubSourceCodeProviderProps;
  defaultSesSenderEmail: string;
}

export class CloudStack extends cdk.Stack {
  constructor(
    scope: cdk.Construct,
    id: string,
    {
      envName,
      repository,
      defaultSesSenderEmail,
      ...stackProps
    }: cdk.StackProps & SingleEnvironmentProps
  ) {
    super(scope, id, stackProps);

    // Grab needed parameters from SSM
    const parameters: Parameters = {
      appleClientId: getParameterFromParameterStore(
        this,
        envName,
        "/apple/oauth/client_id"
      ),
      appleTeamId: getParameterFromParameterStore(
        this,
        envName,
        "/apple/oauth/team_id"
      ),
      appleKeyId: getParameterFromParameterStore(
        this,
        envName,
        "/apple/oauth/key_id"
      ),
      applePrivateKey: getParameterFromParameterStore(
        this,
        envName,
        "/apple/oauth/private_key"
      ),
      facebookClientId: getParameterFromParameterStore(
        this,
        envName,
        "/facebook/oauth/client_id"
      ),
      facebookSecret: getParameterFromParameterStore(
        this,
        envName,
        "/facebook/oauth/secret"
      ),
      googleClientId: getParameterFromParameterStore(
        this,
        envName,
        "/google/oauth/client_id"
      ),
      googleSecret: getParameterFromParameterStore(
        this,
        envName,
        "/google/oauth/secret"
      ),
    };

    // Create Amplify application
    const { defaultDomain, policyForAmplifyCiCd } = new AmplifyCdkConstruct(
      this,
      `${envName}-Amplify`,
      {
        envName,
        repository,
        parameters,
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
    const { notificationTemplatesTranslationsBucket } =
      new NotificationsSendingCdkConstruct(this, `${envName}-EmailSending`, {
        envName,
        defaultSesSenderEmail,
        defaultDomain,
      });

    // Whole cognito setup with Pinpoint
    const { userPool } = new CognitoCdkConstruct(
      this,
      `${envName}-CognitoPinpoint`,
      {
        defaultDomain,
        envName,
        pinpointArn,
        notificationTemplatesTranslationsBucket,
        defaultSesSenderEmail,
        parameters,
      }
    );

    // GraphQL API with Lambdas
    new AppSyncCdkConstruct(this, `${envName}-AppsyncGraphQlApi`, {
      envName,
      userPool,
    });
  }
}
