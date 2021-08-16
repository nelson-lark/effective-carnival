import * as cdk from "@aws-cdk/core";

import * as appsync from "@aws-cdk/aws-appsync";
import * as cognito from "@aws-cdk/aws-cognito";
import * as path from "path";

import { applyTagsToResource } from "@utils/functions";
import { EnvName } from "@enums/EnvName";
import { FeedbackCdkConstruct } from "lib/feedback/feedbackCdkConstruct";
import { UserCdkConstruct } from "lib/user/userCdkConstruct";
import { ServicePurpose } from "@enums/ServicePurpose";

interface AppSyncProps {
  envName: EnvName;
  userPool: cognito.IUserPool;
}

export class AppSyncCdkConstruct extends cdk.Construct {
  public api: appsync.GraphqlApi;

  constructor(
    scope: cdk.Construct,
    id: string,
    { envName, userPool }: AppSyncProps
  ) {
    super(scope, id);
    // ========================================================================
    // Resource: AppSync GraphQL API
    // ========================================================================

    // Purpose: API Gateway

    this.api = new appsync.GraphqlApi(this, `${envName}-GraphQLApi`, {
      name: `${envName}-GraphQLApi`,
      schema: appsync.Schema.fromAsset(path.join(__dirname, "schema.graphql")),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool,
          },
        },
      },
      logConfig: {
        excludeVerboseContent: false,
        fieldLogLevel: appsync.FieldLogLevel.ERROR,
      },
      xrayEnabled: true,
    });

    // ========================================================================
    // Resource: AWS DynamoDB resolvers
    // ========================================================================

    new FeedbackCdkConstruct(this, `${envName}-Feedback`, {
      envName,
      graphQlApi: this.api,
    });

    applyTagsToResource([this.api], {
      envName,
      purpose: ServicePurpose.PointOfEntry,
    });

    // ========================================================================
    // Resource: AWS Lambda resolvers
    // ========================================================================

    new UserCdkConstruct(this, `${envName}-User`, {
      envName,
      graphQlApi: this.api,
      userPoolId: userPool.userPoolId,
    });

    // ========================================================================
    // Exports
    // ========================================================================

    new cdk.CfnOutput(this, `${envName}-GraphQLUrlExport`, {
      exportName: `${envName}-graphqlUrl`,
      value: this.api.graphqlUrl,
    });

    new cdk.CfnOutput(this, `${envName}-GraphQLRegionExport`, {
      exportName: `${envName}-graphqlRegion`,
      value: process.env.CDK_DEFAULT_REGION!,
    });
  }
}
