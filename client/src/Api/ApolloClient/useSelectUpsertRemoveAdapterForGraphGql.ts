import {
  DocumentNode,
  MutationHookOptions,
  OperationVariables,
  QueryHookOptions,
} from '@apollo/client';
import { useQueryGraphql } from './useQueryGraphql';
import { useMutationGraphql } from './useMutationGraphql';

type UseSelectUpsertRemoveAdapterForGraphGqlArgs<
  TData = any,
  TVariables = OperationVariables,
> = {
  selectParam: {
    gql: DocumentNode;
    options: QueryHookOptions<TData, TVariables>;
  };
  upsertParam: {
    gql: DocumentNode;
    options: MutationHookOptions<TData, TVariables>;
  };
  removeParam: {
    gql: DocumentNode;
    options: MutationHookOptions<TData, TVariables>;
  };
};

export const useSelectUpsertRemoveAdapterForGraphGql = <
  TData = any,
  TVariables = OperationVariables,
>({
  selectParam,
  upsertParam,
  removeParam,
}: UseSelectUpsertRemoveAdapterForGraphGqlArgs<TData, TVariables>) => {
  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQueryGraphql(selectParam.gql, selectParam.options);
  const [
    upsert,
    { data: upsertData, loading: upsertLoading, error: upsertError },
  ] = useMutationGraphql(upsertParam.gql, upsertParam.options);
  const [
    remove,
    { data: removeData, loading: removeLoading, error: removeError },
  ] = useMutationGraphql(removeParam.gql, removeParam.options);

  const loading = queryLoading || upsertLoading || removeLoading;
  const error = queryError || upsertError || removeError;

  return {
    queryData,
    upsertData,
    removeData,
    loading,
    error,
    upsert,
    remove,
  };
};
