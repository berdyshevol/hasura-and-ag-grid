import {
  DocumentNode,
  LazyQueryHookOptions,
  LazyQueryResult,
  OperationVariables,
  QueryLazyOptions,
  useLazyQuery,
} from '@apollo/client';

type UseLazyQueryGraphqlResult<TData, TVariables> = [
  (
    options?: QueryLazyOptions<TVariables>,
  ) => Promise<LazyQueryResult<TData, TVariables>>,
  LazyQueryResult<TData, TVariables>,
];

export function useLazyQueryGraphql<
  TData = any,
  TVariables = OperationVariables,
>(
  gqlQuery: DocumentNode,
  options: LazyQueryHookOptions<TData, TVariables>,
): UseLazyQueryGraphqlResult<TData, TVariables> {
  return useLazyQuery(gqlQuery, { fetchPolicy: 'network-only', ...options });
}
