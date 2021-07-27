#!/usr/bin/env node
import "tsconfig-paths/register";
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";

import { CloudStack } from "../lib/cloud-stack";

import { EnvName } from "@enums/EnvName";

const app = new cdk.App();

const githubRepositoryConfig = {
  owner: "MichalBunkowski",
  repository: "effective-carnival",
  oauthToken: cdk.SecretValue.secretsManager("github_token", {
    jsonField: "GITHUB_TOKEN",
  }),
};

new CloudStack(app, "EffectiveCarnivalStackDevelopment", {
  envName: EnvName.Development,
  repository: githubRepositoryConfig,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  defaultSesSenderEmail: "m.bunkowski@codeandpepper.com",
});

new CloudStack(app, "EffectiveCarnivalStackTest", {
  envName: EnvName.Test,
  repository: githubRepositoryConfig,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  defaultSesSenderEmail: "m.bunkowski@codeandpepper.com",
});

new CloudStack(app, "EffectiveCarnivalStackStaging", {
  envName: EnvName.Staging,
  repository: githubRepositoryConfig,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  defaultSesSenderEmail: "m.bunkowski@codeandpepper.com",
});

new CloudStack(app, "EffectiveCarnivalStackProduction", {
  envName: EnvName.Production,
  repository: githubRepositoryConfig,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  defaultSesSenderEmail: "m.bunkowski@codeandpepper.com",
});
