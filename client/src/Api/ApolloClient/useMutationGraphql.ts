import {
  DocumentNode,
  MutationHookOptions,
  MutationTuple,
  OperationVariables,
  useMutation,
} from '@apollo/client';

export const useMutationGraphql = <
  TData = any,
  TVariables = OperationVariables,
>(
  gqlMutation: DocumentNode,
  options?: MutationHookOptions<TData, TVariables>,
): MutationTuple<TData, TVariables> => {
  return useMutation(gqlMutation, options);
};
