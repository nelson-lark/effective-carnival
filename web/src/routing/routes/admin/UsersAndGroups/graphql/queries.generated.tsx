import * as Types from "../../../../../types/generated/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {};
export type GetUsersQueryVariables = Types.Exact<{
  args: Types.GetUsersArgs;
}>;

export type GetUsersQuery = {
  __typename?: "Query";
  users: {
    __typename?: "GetUsersResponse";
    paginationToken?: Types.Maybe<string>;
    estimatedNumberOfUsers?: Types.Maybe<number>;
    items: Array<{
      __typename?: "User";
      id: string;
      email: string;
      phoneNumber: string;
      enabled: boolean;
      verified: boolean;
      updatedAt: string;
    }>;
  };
};

export const GetUsersDocument = gql`
  query getUsers($args: GetUsersArgs!) {
    users: getUsers(getUsersArgs: $args) {
      items {
        id
        email
        phoneNumber
        enabled
        verified
        updatedAt
      }
      paginationToken
      estimatedNumberOfUsers
    }
  }
`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options
  );
}
export function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options
  );
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<
  typeof useGetUsersLazyQuery
>;
export type GetUsersQueryResult = Apollo.QueryResult<
  GetUsersQuery,
  GetUsersQueryVariables
>;
