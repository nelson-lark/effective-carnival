import * as Types from "../../../../types/generated/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {};
export type GetAllFeedbacksQueryVariables = Types.Exact<{
  paginationInput: Types.PaginationInput;
}>;

export type GetAllFeedbacksQuery = {
  __typename?: "Query";
  feedbacks: {
    __typename?: "GetAllFeedbacksResponse";
    totalCount: number;
    items: Array<{
      __typename?: "Feedback";
      PK: string;
      SK: string;
      username: string;
      time: any;
      description: string;
    }>;
  };
};

export const GetAllFeedbacksDocument = gql`
  query getAllFeedbacks($paginationInput: PaginationInput!) {
    feedbacks: getAllFeedbacks(paginationInput: $paginationInput) {
      items {
        PK
        SK
        username
        time
        description
      }
      totalCount
    }
  }
`;

/**
 * __useGetAllFeedbacksQuery__
 *
 * To run a query within a React component, call `useGetAllFeedbacksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllFeedbacksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllFeedbacksQuery({
 *   variables: {
 *      paginationInput: // value for 'paginationInput'
 *   },
 * });
 */
export function useGetAllFeedbacksQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAllFeedbacksQuery,
    GetAllFeedbacksQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllFeedbacksQuery, GetAllFeedbacksQueryVariables>(
    GetAllFeedbacksDocument,
    options
  );
}
export function useGetAllFeedbacksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllFeedbacksQuery,
    GetAllFeedbacksQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAllFeedbacksQuery,
    GetAllFeedbacksQueryVariables
  >(GetAllFeedbacksDocument, options);
}
export type GetAllFeedbacksQueryHookResult = ReturnType<
  typeof useGetAllFeedbacksQuery
>;
export type GetAllFeedbacksLazyQueryHookResult = ReturnType<
  typeof useGetAllFeedbacksLazyQuery
>;
export type GetAllFeedbacksQueryResult = Apollo.QueryResult<
  GetAllFeedbacksQuery,
  GetAllFeedbacksQueryVariables
>;
