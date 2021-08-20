import * as Types from "../../../../../types/generated/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {};
export type SetUserStatusMutationVariables = Types.Exact<{
  statusInput: Types.StatusInput;
}>;

export type SetUserStatusMutation = {
  __typename?: "Mutation";
  user: {
    __typename?: "User";
    id: string;
    email: string;
    phoneNumber: string;
    enabled: boolean;
    verified: boolean;
    updatedAt: string;
  };
};

export const SetUserStatusDocument = gql`
  mutation setUserStatus($statusInput: StatusInput!) {
    user: setUserStatus(statusInput: $statusInput) {
      id
      email
      phoneNumber
      enabled
      verified
      updatedAt
    }
  }
`;
export type SetUserStatusMutationFn = Apollo.MutationFunction<
  SetUserStatusMutation,
  SetUserStatusMutationVariables
>;

/**
 * __useSetUserStatusMutation__
 *
 * To run a mutation, you first call `useSetUserStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUserStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUserStatusMutation, { data, loading, error }] = useSetUserStatusMutation({
 *   variables: {
 *      statusInput: // value for 'statusInput'
 *   },
 * });
 */
export function useSetUserStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetUserStatusMutation,
    SetUserStatusMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SetUserStatusMutation,
    SetUserStatusMutationVariables
  >(SetUserStatusDocument, options);
}
export type SetUserStatusMutationHookResult = ReturnType<
  typeof useSetUserStatusMutation
>;
export type SetUserStatusMutationResult =
  Apollo.MutationResult<SetUserStatusMutation>;
export type SetUserStatusMutationOptions = Apollo.BaseMutationOptions<
  SetUserStatusMutation,
  SetUserStatusMutationVariables
>;
