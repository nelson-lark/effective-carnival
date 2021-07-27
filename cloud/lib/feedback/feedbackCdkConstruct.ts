import * as cdk from "@aws-cdk/core";

import * as appsync from "@aws-cdk/aws-appsync";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as es from "@aws-cdk/aws-elasticsearch";
import * as path from "path";

import { applyTagsToResource } from "@utils/functions";
import { EnvName } from "@enums/EnvName";
import { ServicePurpose } from "@enums/ServicePurpose";

import { SaveFeedbackToElasticSearchCdkConstruct } from "./saveFeedbackToElasticSearch/saveFeedbackToElasticSearchCdkConstruct";

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
        stream: dynamodb.StreamViewType.NEW_IMAGE,
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

    applyTagsToResource([feedbackDynamoDataSource], {
      envName,
      purpose: ServicePurpose.Feedback,
    });

    // ========================================================================
    // Resource: Amazon ElasticSearch Domain
    // ========================================================================

    // Purpose: Used for storing feedback data

    const elasticSearchDomain = new es.Domain(
      this,
      `${envName}-ElasticSearchFeedback`,
      {
        domainName: `${envName}-feedback`,
        version: es.ElasticsearchVersion.V7_10,
        enableVersionUpgrade: true,
        enforceHttps: true,
        capacity: {
          dataNodeInstanceType: "t3.small.elasticsearch",
        },
      }
    );

    applyTagsToResource([elasticSearchDomain], {
      envName,
      purpose: ServicePurpose.DataStore,
    });

    // ========================================================================
    // Resource: Amazon Lambda
    // ========================================================================

    // Purpose: Save feedback from DynamoDB stream to ElasticSearch domain

    new SaveFeedbackToElasticSearchCdkConstruct(
      this,
      `${envName}-SaveFeedbackToElasticSearch`,
      {
        envName,
        elasticSearchDomain,
        dynamoTable,
      }
    );

    // ========================================================================
    // Resource: AWS ElasticSearch Appsync Resolver
    // ========================================================================

    // Purpose: Get feedback from ElasticSearch

    const feedbackElasticDataSource = graphQlApi.addElasticsearchDataSource(
      `${envName}FeedbackElasticDataSource`,
      elasticSearchDomain
    );

    applyTagsToResource([feedbackElasticDataSource], {
      envName,
      purpose: ServicePurpose.Feedback,
    });

    feedbackElasticDataSource.createResolver({
      typeName: "Query",
      fieldName: "getAllFeedbacks",
      requestMappingTemplate: appsync.MappingTemplate.fromFile(
        path.join(__dirname, "templates/getAllFeedbacks.request.vtl")
      ),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(
        path.join(__dirname, "templates/getAllFeedbacks.response.vtl")
      ),
    });
  }
}
