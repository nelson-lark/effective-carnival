import * as cdk from "@aws-cdk/core";

import * as cognito from "@aws-cdk/aws-cognito";
import * as iam from "@aws-cdk/aws-iam";
import * as s3 from "@aws-cdk/aws-s3";

import { AuthorizationEmailsCdkConstruct } from "./authorizationEmails/authorizationEmailsCdkConstruct";

import { applyTagsToResource } from "@utils/functions";

import { EnvName } from "@enums/EnvName";
import { ServicePurpose } from "@enums/ServicePurpose";

interface CognitoProps {
  defaultDomain: string;
  envName: EnvName;
  pinpointArn: string;
  emailTemplatesBucket: s3.Bucket;
}

export class CognitoCdkConstruct extends cdk.Construct {
  public userPool: cognito.UserPool;
  constructor(
    scope: cdk.Construct,
    id: string,
    { defaultDomain, envName, pinpointArn, emailTemplatesBucket }: CognitoProps
  ) {
    super(scope, id);

    // ========================================================================
    // Resource: Amazon Cognito User Pool
    // ========================================================================

    // Purpose: creates a user directory and allows federation from external IdPs

    this.userPool = new cognito.UserPool(this, `${envName}-CognitoUserPool`, {
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      autoVerify: {
        email: true,
      },
      passwordPolicy: {
        minLength: 10,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: false,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        tempPasswordValidity: cdk.Duration.days(3),
      },
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
        phone: true,
      },
      standardAttributes: {
        email: {
          mutable: true,
          required: false,
        },
        phoneNumber: {
          mutable: true,
          required: false,
        },
      },
      userVerification: {
        emailSubject: "EffectiveCarnival | Verify account",
        emailStyle: cognito.VerificationEmailStyle.CODE,
      },
    });

    // Adds 'admin' group
    new cognito.CfnUserPoolGroup(this, `${envName}-AdminUserPoolGroup`, {
      userPoolId: this.userPool.userPoolId,
      groupName: "admin",
    });

    // Adds Cognito UserPool domain prefix
    const cognitoUserPoolDomain = new cognito.UserPoolDomain(
      this,
      `${envName}-CognitoUserPoolDomain`,
      {
        cognitoDomain: {
          domainPrefix: `${envName}-effective-carnival-user-pool`,
        },
        userPool: this.userPool,
      }
    );

    // Adds custom email templates for Cognito
    const { messageFunction } = new AuthorizationEmailsCdkConstruct(
      this,
      `${envName}-EmailTemplates`,
      {
        defaultDomain,
        envName,
        emailTemplatesBucket,
      }
    );

    this.userPool.addTrigger(
      cognito.UserPoolOperation.CUSTOM_MESSAGE,
      messageFunction
    );

    // UserPoolClient - user pool for application

    const domains = [`https://${defaultDomain}`];

    if (envName === EnvName.Development) {
      domains.push("http://localhost:3000");
    }

    const cognitoUserPoolClient = new cognito.UserPoolClient(
      this,
      `${envName}-CognitoUserPoolClient`,
      {
        disableOAuth: false,
        oAuth: {
          callbackUrls: domains.map((domain) => `${domain}/sign-in/`),
          flows: {
            authorizationCodeGrant: true,
          },
          logoutUrls: domains.map((domain) => `${domain}/sign-out/`),
          scopes: [
            cognito.OAuthScope.EMAIL,
            cognito.OAuthScope.PHONE,
            cognito.OAuthScope.PROFILE,
            cognito.OAuthScope.OPENID,
            cognito.OAuthScope.COGNITO_ADMIN,
          ],
        },
        supportedIdentityProviders: [
          cognito.UserPoolClientIdentityProvider.COGNITO,
        ],
        preventUserExistenceErrors: true,
        userPool: this.userPool,
      }
    );

    cognitoUserPoolClient.node.addDependency(this.userPool);

    const cognitoIdentityPool = new cognito.CfnIdentityPool(
      this,
      `${envName}-CognitoIdentityPool`,
      {
        allowClassicFlow: false,
        allowUnauthenticatedIdentities: true,
        cognitoIdentityProviders: [
          {
            clientId: cognitoUserPoolClient.userPoolClientId,
            providerName: this.userPool.userPoolProviderName,
            serverSideTokenCheck: false,
          },
        ],
      }
    );

    cognitoIdentityPool.node.addDependency(cognitoUserPoolClient);
    cognitoIdentityPool.node.addDependency(this.userPool);

    // ========================================================================
    // Resource: Amazon Cognito User policies
    // ========================================================================

    // Purpose: IAM roles for authed/unauthed users

    // IAM Policy, which allows to use Pinpoint
    const policyForUnauthorizedCognitoUser = new iam.ManagedPolicy(
      this,
      `${envName}-ManagedPolicyForCognitoPinpointUser`,
      {
        statements: [
          new iam.PolicyStatement({
            actions: ["mobiletargeting:PutEvents"],
            effect: iam.Effect.ALLOW,
            resources: [`${pinpointArn}/*`],
          }),
          new iam.PolicyStatement({
            actions: ["mobiletargeting:UpdateEndpoint"],
            effect: iam.Effect.ALLOW,
            resources: [`${pinpointArn}/*`],
          }),
          new iam.PolicyStatement({
            actions: ["mobileanalytics:PutEvents", "cognito-sync:*"],
            effect: iam.Effect.ALLOW,
            resources: ["*"],
          }),
        ],
      }
    );

    // IAM Role for unauthorized Cognito users
    const unauthorizedCognitoUserRole = new iam.Role(
      this,
      `${envName}-RoleForUnauthenticatedCognitoUser`,
      {
        assumedBy: new iam.FederatedPrincipal(
          "cognito-identity.amazonaws.com",
          {
            StringEquals: {
              "cognito-identity.amazonaws.com:aud": cognitoIdentityPool.ref,
            },
            "ForAnyValue:StringLike": {
              "cognito-identity.amazonaws.com:amr": "unauthenticated",
            },
          },
          "sts:AssumeRoleWithWebIdentity"
        ),
        managedPolicies: [policyForUnauthorizedCognitoUser],
      }
    );

    // IAM Role for authorized Cognito users
    const authorizedCognitoUserRole = new iam.Role(
      this,
      `${envName}-RoleForAuthenticatedCognitoUser`,
      {
        assumedBy: new iam.FederatedPrincipal(
          "cognito-identity.amazonaws.com",
          {
            StringEquals: {
              "cognito-identity.amazonaws.com:aud": cognitoIdentityPool.ref,
            },
            "ForAnyValue:StringLike": {
              "cognito-identity.amazonaws.com:amr": "authenticated",
            },
          },
          "sts:AssumeRoleWithWebIdentity"
        ),
        managedPolicies: [policyForUnauthorizedCognitoUser],
      }
    );

    // Set unauthenticated / authenticated roles for Cognito Identity Pool
    const cognitoPoolRoleAttachment = new cognito.CfnIdentityPoolRoleAttachment(
      this,
      `${envName}-CognitoPoolRoleAttachment`,
      {
        identityPoolId: cognitoIdentityPool.ref,
        roles: {
          unauthenticated: unauthorizedCognitoUserRole.roleArn,
          authenticated: authorizedCognitoUserRole.roleArn,
        },
      }
    );

    applyTagsToResource(
      [
        authorizedCognitoUserRole,
        cognitoIdentityPool,
        cognitoPoolRoleAttachment,
        cognitoUserPoolClient,
        cognitoUserPoolDomain,

        policyForUnauthorizedCognitoUser,
        this.userPool,
        unauthorizedCognitoUserRole,
      ],
      {
        envName,
        purpose: ServicePurpose.Authorization,
      }
    );

    // ========================================================================
    // Exports
    // ========================================================================

    new cdk.CfnOutput(this, `${envName}-CognitoIdentityPoolExport`, {
      exportName: `${envName}-cognitoIdentityPool`,
      value: cognitoIdentityPool.ref,
    });

    new cdk.CfnOutput(this, `${envName}-CognitoRegionExport`, {
      exportName: `${envName}-cognitoRegion`,
      value: process.env.CDK_DEFAULT_REGION!,
    });

    new cdk.CfnOutput(this, `${envName}-CognitoUserPoolIdExport`, {
      exportName: `${envName}-cognitoUserPoolId`,
      value: this.userPool.userPoolId,
    });

    new cdk.CfnOutput(this, `${envName}-CognitoUserPoolClientIdExport`, {
      exportName: `${envName}-cognitoUserPoolClientId`,
      value: cognitoUserPoolClient.userPoolClientId,
    });

    new cdk.CfnOutput(this, `${envName}-CognitoUserPoolDomainExport`, {
      exportName: `${envName}-cognitoUserPoolDomain`,
      value: cognitoUserPoolDomain.baseUrl().replace("https://", ""),
    });
  }
}
