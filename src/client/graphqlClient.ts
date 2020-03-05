import { feature, HOST, PORT } from "../config";
import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  split
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/link-ws";
import { onError } from "@apollo/link-error";
import fetch from "cross-fetch";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(
        `GraphQL Error: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }

  if (networkError) {
    console.error(`GraphQL Network Error]: ${networkError}`);
  }
});

const httpLink = () =>
  new HttpLink({
    uri: `http://${HOST}:${PORT}/graphql`,
    fetch
  });

const wsLink = () =>
  new WebSocketLink({
    uri: `ws://${HOST}:${PORT}/graphql`,
    options: {
      reconnect: true
    }
  });

//
// prettier-ignore
const splitLink = () => split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" &&
      definition.operation === "subscription";
  },
  wsLink(),
  httpLink()
);

export const gqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, feature.realTime ? splitLink() : httpLink()])
});
