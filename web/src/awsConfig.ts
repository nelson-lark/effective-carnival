import Amplify, { Auth, Analytics } from "aws-amplify";

export const authConfig = {
  Auth: {
    identityPoolId: process.env.REACT_APP_EFFECTIVE_CARNIVAL_AWS_COGNITO_IDENTITY_POOL,
    region: process.env.REACT_APP_EFFECTIVE_CARNIVAL_AWS_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_EFFECTIVE_CARNIVAL_AWS_COGNITO_USER_POOL_ID,
    userPoolWebClientId:
      process.env.REACT_APP_EFFECTIVE_CARNIVAL_AWS_COGNITO_USER_POOL_CLIENT_ID,
    oauth: {
      domain: process.env.REACT_APP_EFFECTIVE_CARNIVAL_AWS_COGNITO_USER_POOL_DOMAIN,
      redirectSignIn: `${window.location.origin}/sign-in/`,
      redirectSignOut: `${window.location.origin}/sign-out/`,
      responseType: "code",
      scope: [
        "phone",
        "email",
        "profile",
        "openid",
        "aws.cognito.signin.user.admin",
      ],
    },
  },
};

export const analyticsConfig = {
  AWSPinpoint: {
    appId: process.env.REACT_APP_EFFECTIVE_CARNIVAL_AWS_PINPOINT_PROJECT,
    region: process.env.REACT_APP_EFFECTIVE_CARNIVAL_AWS_PINPOINT_REGION,
    mandatorySignIn: false,
  },
};

const configureAws = (): void => {
  Auth.configure(authConfig);
  Analytics.configure(analyticsConfig);
  Amplify.Logger.LOG_LEVEL = "DEBUG";
};

export default configureAws;
