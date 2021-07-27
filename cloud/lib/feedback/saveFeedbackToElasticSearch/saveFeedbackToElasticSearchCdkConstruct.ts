import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";

import path from "path";

import { Domain } from "@aws-cdk/aws-elasticsearch";
import { DynamoEventSource } from "@aws-cdk/aws-lambda-event-sources";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import { Table } from "@aws-cdk/aws-dynamodb";

import { applyTagsToResource } from "@utils/functions";
import { DEFAULT_LAMBDA_RUNTIME } from "@consts/index";
import { EnvName } from "@enums/EnvName";
import { ServicePurpose } from "@enums/ServicePurpose";

interface SaveTransactionsToElasticSearchProps {
  elasticSearchDomain: Domain;
  envName: EnvName;
  dynamoTable: Table;
}

export class SaveFeedbackToElasticSearchCdkConstruct extends cdk.Construct {
  constructor(
    scope: cdk.Construct,
    id: string,
    {
      dynamoTable,
      envName,
      elasticSearchDomain,
    }: SaveTransactionsToElasticSearchProps
  ) {
    super(scope, id);

    // ========================================================================
    // Resource: AWS Lambda
    // ========================================================================

    // Purpose: Save feedback from DynamoDB stream to ElasticSearch
    // May be replaced by https://aws.amazon.com/glue/features/elastic-views/ in the future

    const saveFeedbackToElasticSearchLambda = new NodejsFunction(
      this,
      `${envName}-saveFeedbackToElasticSearchLambda`,
      {
        entry: path.join(__dirname, "./saveFeedbackToElasticSearchLambda.ts"),
        handler: "handler",
        runtime: DEFAULT_LAMBDA_RUNTIME,
        environment: {
          ELASTICSEARCH_DOMAIN_ENDPOINT: elasticSearchDomain.domainEndpoint,
        },
      }
    );

    dynamoTable.grantStreamRead(saveFeedbackToElasticSearchLambda);
    elasticSearchDomain.grantWrite(saveFeedbackToElasticSearchLambda);

    saveFeedbackToElasticSearchLambda.addEventSource(
      new DynamoEventSource(dynamoTable, {
        startingPosition: lambda.StartingPosition.LATEST,
        batchSize: 100,
        bisectBatchOnError: true,
      })
    );

    applyTagsToResource([saveFeedbackToElasticSearchLambda], {
      envName,
      purpose: ServicePurpose.DataStore,
    });
  }
}
