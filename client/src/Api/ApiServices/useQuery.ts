import { DocumentNode, QueryResult } from '@apollo/client';
import { useQueryGraphql } from '../ApolloClient';
import { errorHandling } from '../../Logger/error';

export type UseQueryObject<TDataObject = any, TVariables = any> = (
  variables: TVariables,
) => QueryResult<{ payload: TDataObject }, TVariables> & {
  payload: TDataObject | undefined;
};

export type UseQueryArray<TDataObject = any, TVariables = any> = (
  variables: TVariables,
) => QueryResult<{ payload: TDataObject[] }, TVariables> & {
  payload: TDataObject[];
};

/**
 * This hook
 * 1) fetches object from graphql endpoint with given gql query and variables.
 * 2) log error
 */
export const useQueryObject = <TDataObject, TVariables>(
  gqlQuery: DocumentNode,
  variables: TVariables,
) => {
  const resultQuery = useQueryGraphql<{ payload: TDataObject }, TVariables>(
    gqlQuery,
    { variables },
  );

  if (resultQuery.error) errorHandling(resultQuery.error);

  return { ...resultQuery, payload: resultQuery?.data?.payload };
};

/**
 * This hook
 * 1) fetches array of objects from graphql endpoint with given gql query and variables.
 * 2) log error
 */
export const useQueryArray = <TDataObject, TVariables>(
  gqlQuery: DocumentNode,
  variables: TVariables,
) => {
  const resultQuery = useQueryGraphql<{ payload: TDataObject[] }, TVariables>(
    gqlQuery,
    { variables },
  );

  if (resultQuery.error) errorHandling(resultQuery.error);

  return { ...resultQuery, payload: resultQuery?.data?.payload || [] };
};
