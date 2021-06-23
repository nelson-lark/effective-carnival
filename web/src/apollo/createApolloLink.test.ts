import { Analytics } from "aws-amplify";

import { CognitoUserSession } from "amazon-cognito-identity-js";

import createApolloLink from "./createApolloLink";

describe("createApolloLink", () => {
  it("should create a valid apollo with token from Auth.session", () => {
    Analytics.record = jest.fn();
    const getJwtToken = jest.fn();

    const session = {
      getAccessToken: () => ({
        getJwtToken,
      }),
    } as unknown as CognitoUserSession;

    createApolloLink(session);

    expect(getJwtToken).toBeCalled();
  });
});
