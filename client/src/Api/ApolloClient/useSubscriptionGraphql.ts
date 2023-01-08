import {
  DocumentNode,
  OperationVariables,
  SubscriptionHookOptions,
  useSubscription,
} from '@apollo/client';

export const useSubscriptionGraphql = <
  TData = any,
  TVariables = OperationVariables,
>(
  gqlQuery: DocumentNode,
  options: SubscriptionHookOptions<TData, TVariables>,
) => {
  return useSubscription(gqlQuery, { fetchPolicy: 'network-only', ...options });
};
