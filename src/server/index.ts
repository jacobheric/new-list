import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { db, migrate, PORT } from "../config";
import { typeDefs, resolvers } from "./graphql";

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.use(express.static('dist'));

db.sync().then(async () => {
   //
   // quick and dirty db migration
   migrate();
   app.listen(PORT, function () {
      console.log(`⚛ Server running at http://localhost:${ PORT }` );
      console.log(`⚛ Graphql running at http://localhost:${ PORT }${server.graphqlPath}`);
   });
});

