import { ApolloClient } from "@apollo/client";
import { Auth } from "aws-amplify";
import { renderHook } from "@testing-library/react-hooks";

import useApolloClient from "./useApolloClient";

describe("useApolloClient()", () => {
  Auth.currentSession = jest.fn().mockImplementation(() => ({
    getAccessToken: () => ({
      getJwtToken: () => "token",
    }),
  }));

  it("should return valid ApolloClient", () => {
    const { result } = renderHook(() => useApolloClient());

    expect(result.current).toBeInstanceOf(ApolloClient);
  });
});
