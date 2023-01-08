import {
  DocumentNode,
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  useQuery,
} from '@apollo/client';

export const useQueryGraphql = <TData = any, TVariables = OperationVariables>(
  gqlQuery: DocumentNode,
  options: QueryHookOptions<TData, TVariables>,
): QueryResult<TData, TVariables> => {
  return useQuery(gqlQuery, {
    fetchPolicy: 'network-only',
    ...options,
  });
};
