import { CognitoIdentityServiceProvider } from "aws-sdk";

export const cognitoIdentityServiceProvider =
  new CognitoIdentityServiceProvider({
    region: process.env.REGION,
  });
