import * as cdk from "@aws-cdk/core";
import * as iam from "@aws-cdk/aws-iam";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";

import * as appsync from "@aws-cdk/aws-appsync";
import * as path from "path";

import { applyTagsToResource } from "@utils/functions";
import { EnvName } from "@enums/EnvName";
import { ServicePurpose } from "@enums/ServicePurpose";
import { DEFAULT_LAMBDA_RUNTIME } from "@consts/index";

interface UserProps {
  envName: EnvName;
  graphQlApi: appsync.GraphqlApi;
  userPoolId: string;
}

export class UserCdkConstruct extends cdk.Construct {
  constructor(
    scope: cdk.Construct,
    id: string,
    { envName, graphQlApi, userPoolId }: UserProps
  ) {
    super(scope, id);

    // ========================================================================
    // Resource: AWS Lambda
    // ========================================================================

    const userLambda = new NodejsFunction(
      this,
      `${envName}-UserManagmentLambda`,
      {
        runtime: DEFAULT_LAMBDA_RUNTIME,
        handler: "handler",
        entry: path.join(__dirname, `/lambda/userLambda.ts`),
        memorySize: 1024,
      }
    );

    const userLambdaDataSource = graphQlApi.addLambdaDataSource(
      `${envName}UserLambdaDataSource`,
      userLambda
    );

    userLambda.addToRolePolicy(
      new iam.PolicyStatement({
        resources: ["*"],
        actions: [
          "cognito-idp:ListUsers",
          "cognito-idp:DescribeUserPool",
          "cognito-idp:AdminUpdateUserAttributes",
          "cognito-idp:AdminGetUser",
          "cognito-idp:AdminListGroupsForUser",
          "cognito-idp:AdminEnableUser",
          "cognito-idp:AdminDisableUser",
        ],
        effect: iam.Effect.ALLOW,
      })
    );

    applyTagsToResource([userLambdaDataSource], {
      envName,
      purpose: ServicePurpose.UserManagement,
    });

    userLambdaDataSource.createResolver({
      typeName: "Query",
      fieldName: "getUsers",
    });

    userLambdaDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "updateUser",
    });

    userLambdaDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "setUserStatus",
    });

    userLambda.addEnvironment("USER_POOL_ID", userPoolId);
  }
}
