import {
  split,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { onError } from '@apollo/client/link/error';
import { createClient } from 'graphql-ws';
import { _DEV_ } from './utils';
import App from './App';
import { getToken } from './Auth/authService';

export const ApolloClientWrapper = () => {
  const isDevMode = _DEV_;
  const hasura_host = process.env.REACT_APP_HASURA_HOST;

  const getURI = isDevMode
    ? `http://${hasura_host}/v1/graphql`
    : `https://${hasura_host}/v1/graphql`;

  const getWS = isDevMode
    ? `ws://${hasura_host}/v1/graphql`
    : `wss://${hasura_host}/v1/graphql`;

  const authToken = `Bearer ${getToken()}`;

  const errorLink = onError(({ networkError }) => {
    if (networkError) console.error(`[Network error]: ${networkError}`);
  });

  const httpLink = new HttpLink({
    uri: getURI,
    headers: {
      Authorization: authToken,
    },
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: getWS,
      connectionParams: {
        headers: {
          Authorization: authToken,
        },
      },
    }),
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const client = new ApolloClient({
    link: errorLink.concat(splitLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};
