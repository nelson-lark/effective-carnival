import LambdaTester from "lambda-tester";
import Mock from "@elastic/elasticsearch-mock";
import { DynamoDBStreamEvent } from "aws-lambda";

import ES, { Client } from "@elastic/elasticsearch";

const mock = new Mock();

mock.add(
  {
    method: "POST",
    path: "/_bulk",
  },
  () => {
    return { status: "OK" };
  }
);

class ElasticSearchClientMock extends Client {
  constructor() {
    super({
      node: "http://localhost:9200",
      Connection: mock.getConnection(),
    });
  }
}

ES.Client = ElasticSearchClientMock;

process.env.AWS_REGION = "eu-west-1";
process.env.ELASTICSEARCH_DOMAIN_ENDPOINT = "elasticSearchDomainEndpoint";

import { handler } from "./saveFeedbackToElasticSearchLambda";

describe("saveFeedbackToElasticSearchLambda", () => {
  it("should upload feedback record to ElasticSearch", async () => {
    const lambdaParams: DynamoDBStreamEvent = {
      Records: [
        {
          dynamodb: {
            NewImage: {
              PK: {
                S: "USER#0ef85bb8-3ed6-4754-8240-519c50afd75e",
              },
              SK: {
                S: "FEEDBACK#1f64d61b-9b1a-4c93-b463-ee5f0a5f9459",
              },
              time: {
                S: "2021-07-13T10:09:01.024Z",
              },
              username: {
                S: "0ef85bb8-3ed6-4754-8240-519c50afd75e",
              },
              description: {
                S: "Test feedback",
              },
            },
          },
          eventName: "INSERT",
        },
      ],
    };

    await LambdaTester(handler)
      .event(lambdaParams)
      .expectResolve(() => {});
  });

  it("should delete record from ElasticSearch", async () => {
    const lambdaParams: DynamoDBStreamEvent = {
      Records: [
        {
          dynamodb: {
            NewImage: {
              PK: {
                S: "USER#0ef85bb8-3ed6-4754-8240-519c50afd75e",
              },
              SK: {
                S: "FEEDBACK#1f64d61b-9b1a-4c93-b463-ee5f0a5f9459",
              },
            },
          },
          eventName: "REMOVE",
        },
      ],
    };

    await LambdaTester(handler)
      .event(lambdaParams)
      .expectResolve(() => {});
  });

  it("should resolve with proper message when there's other type of operation", async () => {
    const lambdaParams: DynamoDBStreamEvent = {
      Records: [
        {
          dynamodb: {
            NewImage: {
              PK: {
                S: "USER#0ef85bb8-3ed6-4754-8240-519c50afd75e",
              },
              SK: {
                S: "FEEDBACK#1f64d61b-9b1a-4c93-b463-ee5f0a5f9459",
              },
            },
          },
          eventName: "MODIFY",
        },
      ],
    };

    await LambdaTester(handler)
      .event(lambdaParams)
      .expectResult((result: string) => {
        expect(result).toEqual(
          "There's no data to be uploaded to ElasticSearch"
        );
      });
  });
});
