import { HOST, PORT } from "../config";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const gqlClient = new ApolloClient({
   cache: new InMemoryCache(),
   link: new HttpLink({
      uri: `http://${HOST}:${PORT}/graphql`,
   })
});

