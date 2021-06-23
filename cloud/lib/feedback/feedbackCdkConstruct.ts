import * as cdk from "@aws-cdk/core";

import * as appsync from "@aws-cdk/aws-appsync";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as path from "path";

import { applyTagsToResource } from "@utils/functions";
import { EnvName } from "@enums/EnvName";
import { ServicePurpose } from "@enums/ServicePurpose";

interface FeedbackProps {
  envName: EnvName;
  graphQlApi: appsync.GraphqlApi;
}

export class FeedbackCdkConstruct extends cdk.Construct {
  constructor(
    scope: cdk.Construct,
    id: string,
    { envName, graphQlApi }: FeedbackProps
  ) {
    super(scope, id);

    // ========================================================================
    // Resource: Amazon DynamoDB Table
    // ========================================================================

    // Purpose: Used for storing feedback data

    const dynamoTable = new dynamodb.Table(
      this,
      `${envName}-DynamoFeedbackTable`,
      {
        billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
        partitionKey: { name: "PK", type: dynamodb.AttributeType.STRING },
        sortKey: { name: "SK", type: dynamodb.AttributeType.STRING },
        tableName: `${envName}-DynamoFeedbackTable`,
      }
    );

    applyTagsToResource([dynamoTable], {
      envName,
      purpose: ServicePurpose.DataStore,
    });

    // ========================================================================
    // Resource: AWS DynamoDB Appsync Resolver
    // ========================================================================

    // Purpose: Save feedback from signed-in user

    const feedbackDynamoDataSource = graphQlApi.addDynamoDbDataSource(
      `${envName}FeedbackDynamoDataSource`,
      dynamoTable
    );

    feedbackDynamoDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "sendFeedback",
      requestMappingTemplate: appsync.MappingTemplate.fromFile(
        path.join(__dirname, "templates/sendFeedback.request.vtl")
      ),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });

    feedbackDynamoDataSource.createResolver({
      typeName: "Query",
      fieldName: "getAllFeedbacks",
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    });

    applyTagsToResource([feedbackDynamoDataSource], {
      envName,
      purpose: ServicePurpose.Feedback,
    });
  }
}
