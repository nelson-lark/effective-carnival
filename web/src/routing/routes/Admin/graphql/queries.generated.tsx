import * as Types from "../../../../types/generated/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {};
export type GetAllFeedbacksQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetAllFeedbacksQuery = {
  __typename?: "Query";
  feedbacks: Array<{
    __typename?: "Feedback";
    PK: string;
    SK: string;
    username: string;
    time: any;
    description: string;
  }>;
};

export const GetAllFeedbacksDocument = gql`
  query getAllFeedbacks {
    feedbacks: getAllFeedbacks {
      PK
      SK
      username
      time
      description
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
 *   },
 * });
 */
export function useGetAllFeedbacksQuery(
  baseOptions?: Apollo.QueryHookOptions<
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
