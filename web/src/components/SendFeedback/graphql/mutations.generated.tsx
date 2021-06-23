import * as Types from "../../../types/generated/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {};
export type SendFeedbackMutationVariables = Types.Exact<{
  feedback: Types.FeedbackInput;
}>;

export type SendFeedbackMutation = {
  __typename?: "Mutation";
  sendFeedback?: Types.Maybe<{ __typename?: "Feedback"; description: string }>;
};

export const SendFeedbackDocument = gql`
  mutation sendFeedback($feedback: FeedbackInput!) {
    sendFeedback(feedback: $feedback) {
      description
    }
  }
`;
export type SendFeedbackMutationFn = Apollo.MutationFunction<
  SendFeedbackMutation,
  SendFeedbackMutationVariables
>;

/**
 * __useSendFeedbackMutation__
 *
 * To run a mutation, you first call `useSendFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendFeedbackMutation, { data, loading, error }] = useSendFeedbackMutation({
 *   variables: {
 *      feedback: // value for 'feedback'
 *   },
 * });
 */
export function useSendFeedbackMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendFeedbackMutation,
    SendFeedbackMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SendFeedbackMutation,
    SendFeedbackMutationVariables
  >(SendFeedbackDocument, options);
}
export type SendFeedbackMutationHookResult = ReturnType<
  typeof useSendFeedbackMutation
>;
export type SendFeedbackMutationResult =
  Apollo.MutationResult<SendFeedbackMutation>;
export type SendFeedbackMutationOptions = Apollo.BaseMutationOptions<
  SendFeedbackMutation,
  SendFeedbackMutationVariables
>;
