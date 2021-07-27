import AWS from "aws-sdk";
import createAwsElasticsearchConnector from "aws-elasticsearch-connector";
import { DynamoDBRecord, DynamoDBStreamEvent, Handler } from "aws-lambda";

import { Client } from "@elastic/elasticsearch";

export const handler: Handler<DynamoDBStreamEvent, void | string> = async (
  event,
  context,
  callback
) => {
  const { ELASTICSEARCH_DOMAIN_ENDPOINT } = process.env;

  const client = new Client({
    ...createAwsElasticsearchConnector(AWS.config),
    node: `https://${ELASTICSEARCH_DOMAIN_ENDPOINT}/feedback/`,
  });

  // @ts-ignore
  const data = event.Records.flatMap((x) => getOperation(x));

  if (data.length === 0) {
    callback(null, "There's no data to be uploaded to ElasticSearch");
    return;
  }

  await client.bulk({ refresh: true, body: data });
};

const getOperation: (record: DynamoDBRecord) => string[] = (
  record: DynamoDBRecord
) => {
  switch (record.eventName) {
    case "INSERT":
      return [
        `{"create" : { "_id": "${getRecordId(record)}" }}`,
        JSON.stringify(
          AWS.DynamoDB.Converter.unmarshall(record.dynamodb!.NewImage!)
        ),
      ];
    case "REMOVE":
      return [`{"delete" : { "_id": "${getRecordId(record)}" }}`];
    case "MODIFY":
    default:
      return [];
  }
};

const getRecordId = (record: DynamoDBRecord) =>
  `${record.dynamodb!.NewImage!.PK.S}${record.dynamodb!.NewImage!.SK.S}`;

exports.handler = handler;
