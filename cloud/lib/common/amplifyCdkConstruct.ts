import * as cdk from "@aws-cdk/core";

import * as amplify from "@aws-cdk/aws-amplify";
import * as codebuild from "@aws-cdk/aws-codebuild";
import * as iam from "@aws-cdk/aws-iam";

import * as fs from "fs";
import * as path from "path";

import { applyTagsToResource, getStackNameByEnvName } from "@utils/functions";

import { EnvName } from "@enums/EnvName";
import { ServicePurpose } from "@enums/ServicePurpose";

interface AmplifyProps {
  envName: EnvName;
  repository: amplify.GitHubSourceCodeProviderProps;
}

const { CDK_DEFAULT_ACCOUNT, CDK_DEFAULT_REGION } = process.env;

export class AmplifyCdkConstruct extends cdk.Construct {
  private readonly amplifyApp: amplify.App;
  private readonly envName: EnvName;
  public readonly policyForAmplifyCiCd: iam.ManagedPolicy;

  constructor(
    scope: cdk.Construct,
    id: string,
    { envName, repository }: AmplifyProps
  ) {
    super(scope, id);

    this.envName = envName;

    // ========================================================================
    // Resource: AWS IAM Role for Amplify
    // ========================================================================

    // Purpose: Allows to read stack values & pull the code

    const wildcardStackArn = `arn:aws:cloudformation:${CDK_DEFAULT_REGION}:${CDK_DEFAULT_ACCOUNT}:stack/*`;
    const policyName = `${envName}-AmplifyCICDPolicy`;

    this.policyForAmplifyCiCd = new iam.ManagedPolicy(
      this,
      `${envName}-AmplifyCICDManagedPolicy`,
      {
        managedPolicyName: policyName,
        statements: [
          new iam.PolicyStatement({
            actions: [
              "cloudformation:CreateChangeSet",
              "cloudformation:DeleteChangeSet",
              "cloudformation:DescribeChangeSet",
              "cloudformation:DescribeStackEvents",
              "cloudformation:DescribeStackResource",
              "cloudformation:DescribeStackResources",
              "cloudformation:DescribeStacks",
              "cloudformation:ExecuteChangeSet",
              "cloudformation:GetTemplate",
              "cloudformation:UpdateStack",
            ],
            effect: iam.Effect.ALLOW,
            resources: [wildcardStackArn],
          }),
          new iam.PolicyStatement({
            actions: [
              "cognito-idp:UpdateIdentityProvider",
              "cognito-idp:AddCustomAttributes",
              "cognito-idp:CreateUserPoolDomain",
              "cognito-idp:CreateUserPool",
            ],
            effect: iam.Effect.ALLOW,
            resources: ["*"],
          }),
          new iam.PolicyStatement({
            actions: ["amplify:ListTagsForResource", "amplify:TagResource"],
            effect: iam.Effect.ALLOW,
            resources: ["*"],
          }),
          new iam.PolicyStatement({
            actions: ["secretsmanager:GetSecretValue"],
            effect: iam.Effect.ALLOW,
            resources: [
              `arn:aws:secretsmanager:${CDK_DEFAULT_REGION}:${CDK_DEFAULT_ACCOUNT}:secret:github_token-??????`,
            ],
          }),
          new iam.PolicyStatement({
            actions: ["iam:CreatePolicyVersion", "iam:DeletePolicyVersion"],
            effect: iam.Effect.ALLOW,
            resources: [
              `arn:aws:iam::${CDK_DEFAULT_ACCOUNT}:policy/${policyName}`,
            ],
          }),
        ],
      }
    );

    // IAM Role for Amplify's CI&CD
    const amplifyCiCdRole = new iam.Role(this, `${envName}-AmplifyCICDRole`, {
      assumedBy: new iam.ServicePrincipal("amplify.amazonaws.com"),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          "AdministratorAccess-Amplify"
        ),
        this.policyForAmplifyCiCd,
      ],
    });

    // ========================================================================
    // Resource: AWS Amplify application
    // ========================================================================

    // Purpose: Frontend deployment with CI&CD

    this.amplifyApp = new amplify.App(this, `${envName}-AmplifyProject`, {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider(repository),
      role: amplifyCiCdRole,
      buildSpec: codebuild.BuildSpec.fromObject({
        version: "1.0",
        frontend: {
          phases: {
            preBuild: {
              commands: [
                "cd cloud",
                "yarn",
                `bash scripts/buildStack.bash ${getStackNameByEnvName(
                  envName
                )}`,
                "source scripts/setEnvs.bash",
                "cd ../web",
                "yarn",
              ],
            },
            build: {
              commands: ["yarn build"],
            },
          },
          artifacts: {
            baseDirectory: "web/build",
            files: ["**/*"],
          },
        },
      }),
    });

    this.amplifyApp.addCustomRule(
      amplify.CustomRule.SINGLE_PAGE_APPLICATION_REDIRECT
    );

    (this.amplifyApp.node.defaultChild as amplify.CfnApp).customHeaders = fs
      .readFileSync(path.join(__dirname, "customHttp.yml"), "utf8")
      .replace(/%DEFAULT_REGION%/g, CDK_DEFAULT_REGION!);

    switch (envName) {
      case EnvName.Development:
        this.amplifyApp.addBranch("develop", {
          branchName: "develop",
          pullRequestPreview: true,
          stage: "PRODUCTION",
        });
        break;
      case EnvName.Test:
        this.amplifyApp.addBranch("test", {
          branchName: "test",
          pullRequestPreview: false,
          stage: "PRODUCTION",
        });
        break;
      case EnvName.Staging:
        this.amplifyApp.addBranch("staging", {
          branchName: "staging",
          pullRequestPreview: false,
          stage: "PRODUCTION",
        });
        break;
      case EnvName.Production:
        this.amplifyApp.addBranch("master", {
          branchName: "master",
          pullRequestPreview: false,
          stage: "PRODUCTION",
        });
        break;
    }

    applyTagsToResource([amplifyCiCdRole, this.amplifyApp], {
      envName,
      purpose: ServicePurpose.ApplicationDeployment,
    });
  }

  /**
   * Returns default domain for Amplify App
   */
  get defaultDomain(): string {
    const branchName = this.getBranchNameFromEnv();

    return `${branchName}.${this.amplifyApp.defaultDomain}`;
  }

  /**
   * Returns branch name based on ENV
   * @private
   */
  private getBranchNameFromEnv(): string {
    switch (this.envName) {
      case EnvName.Test:
        return "test";
      case EnvName.Staging:
        return "staging";
      case EnvName.Production:
        return "master";
      case EnvName.Development:
      default:
        return "develop";
    }
  }
}
