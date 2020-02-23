import { feature, HOST, PORT } from "../config";
import { split, HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/link-ws";

const httpLink = new HttpLink({
  uri: `http://${HOST}:${PORT}/graphql`
});

const splitClient = () => {
  const wsLink = new WebSocketLink({
    uri: `ws://${HOST}:${PORT}/graphql`,
    options: {
      reconnect: true
    }
  });

  //
  // prettier-ignore
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === "OperationDefinition" &&
         definition.operation === "subscription";
    },
    wsLink as any,
    httpLink
  );

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink
  });
};

const client = () =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink
  });

export const gqlClient = feature.realTime ? splitClient() : client();
