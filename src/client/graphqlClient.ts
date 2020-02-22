import { HOST, PORT } from "../config";
import { split, HttpLink, ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/link-ws';


const wsLink = new WebSocketLink({
   uri: `ws://${HOST}:${PORT}/graphql`,
   options: {
      reconnect: true
   }
});

const httpLink = new HttpLink({
   uri: `http://${HOST}:${PORT}/graphql`
});

const link = split(
   ({ query }) => {
      const definition = getMainDefinition(query);
      return (
         definition.kind === 'OperationDefinition' &&
         definition.operation === 'subscription'
      );
   },
   wsLink as any,
   httpLink,
);

export const gqlClient = new ApolloClient({
   cache: new InMemoryCache(),
   link
});

