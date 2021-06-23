/* eslint-disable @typescript-eslint/no-explicit-any */
import yargs from "yargs";
import AWS from "aws-sdk";
import { spawnSync, execSync } from "child_process";
import { UserPoolDescriptionType } from "aws-sdk/clients/cognitoidentityserviceprovider";

const args = yargs
  .option("stack", {
    alias: "s",
    type: "string",
    description: "Stack to be deleted",
  })
  .option("env", {
    alias: "e",
    type: "string",
    description: "Environment value passed to stack during creation",
  }).argv;

const stack = args.stack as string;
const env = args.env as string;

if (!stack || !env) {
  console.log("\x1b[31m","❌ Missing arguments!", "\x1b[0m")
  process.exit(1)
}

(() => {
  spawnSync(`cdk destroy ${stack}`, {
    shell: true,
    stdio: "inherit",
  });

  console.log("\x1b[34m", "\n🚀 Resources:");

  const S3Buckets = execSync("aws s3 ls")
    .toString()
    .split(/\r?\n/)
    .filter((x) => x.includes(env))
    .map((x) => `s3://${x.split(" ")[2]}`);

  if (S3Buckets.length > 0) {
    console.log("\x1b[34m", "🪣 Removing S3 buckets", "\x1b[0m");
    console.log(JSON.stringify(S3Buckets, null, 2), "\n");

    spawnSync(S3Buckets.map((x) => `aws s3 rb ${x} --force`).join(" && "), {
      shell: true,
      stdio: "ignore",
    });
  } else {
    console.log("\x1b[33m", `No S3 bucket found for stack ${stack}\n`);
  }

  const logGroups = JSON.parse(
    execSync("aws logs describe-log-groups").toString()
  )
    .logGroups.map((x: AWS.CloudWatchLogs.LogGroup) => x.logGroupName)
    .filter((x: string) => x.includes(stack));

  if (logGroups.length > 0) {
    console.log("\x1b[34m", "📝 Removing log groups", "\x1b[0m");
    console.log(JSON.stringify(logGroups, null, 2), "\n");

    spawnSync(
      logGroups
        .map((x: string) => `aws logs delete-log-group --log-group-name ${x}`)
        .join(" && "),
      {
        shell: true,
        stdio: "ignore",
      }
    );
  } else {
    console.log("\x1b[33m", `No logs found for stack ${stack}\n`);
  }

  const dynamoTables = JSON.parse(
    execSync("aws dynamodb list-tables").toString()
  ).TableNames.filter((tableName: string) => tableName.includes(env));

  if (dynamoTables.length > 0) {
    console.log("\x1b[34m", "💽 Removing DynamoDB Tables", "\x1b[0m");
    console.log(JSON.stringify(dynamoTables, null, 2), "\n");

    spawnSync(
      dynamoTables
        .map(
          (tableName: string) =>
            `aws dynamodb delete-table --table-name ${tableName}`
        )
        .join(" && "),
      {
        shell: true,
        stdio: "ignore",
      }
    );
  } else {
    console.log("\x1b[33m", `No DynamoDB Tables found for stack ${stack}\n`);
  }

  const userPools = JSON.parse(
    execSync("aws cognito-idp list-user-pools --max-results 60").toString()
  )
    .UserPools.filter((x: UserPoolDescriptionType) => x.Name?.includes(env))
    .map((x: UserPoolDescriptionType) => x.Id);

  if (userPools.length > 0) {
    console.log("\x1b[34m", "👥 Removing user pools", "\x1b[0m");
    console.log(JSON.stringify(userPools, null, 2), "\n");

    spawnSync(
      userPools
        .map(
          (x: string) => `aws cognito-idp delete-user-pool --user-pool-id ${x}`
        )
        .join(" && "),
      {
        shell: true,
        stdio: "ignore",
      }
    );
  } else {
    console.log("\x1b[33m", `No user pools found for stack ${stack}\n`);
  }

  const elasticSearchDomains = JSON.parse(
    execSync("aws es list-domain-names").toString()
  )
    .DomainNames?.map((x: any) => x.DomainName)
    .filter((x: string) => x.includes(env));

  if (elasticSearchDomains.length > 0) {
    console.log("\x1b[34m", "👀 Removing ElasticSearch domains", "\x1b[0m");
    console.log(JSON.stringify(elasticSearchDomains, null, 2), "\n");

    spawnSync(
      elasticSearchDomains
        .map(
          (x: string) => `aws es delete-elasticsearch-domain --domain-name ${x}`
        )
        .join(" && "),
      {
        shell: true,
        stdio: "ignore",
      }
    );
  } else {
    console.log(
      "\x1b[33m",
      `No ElasticSearch domains found for stack ${stack}\n`
    );
  }

  console.log("\x1b[0m");
})();
