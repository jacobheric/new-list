import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { db, migrate } from "./db";
import { typeDefs, resolvers } from "./graphql";
import * as ParcelBundler from "parcel-bundler";
import { PORT } from "../config";

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

//
// TODO: currently dev mode only, add production run from static bundle
// app.use(express.static('dist'));
const bundler = new ParcelBundler('src/client/index.html');
app.use(bundler.middleware());

db.sync().then(async () => {
   //
   // quick and dirty db migration
   migrate();
   app.listen(PORT, function () {
      console.log(`⚛ Server running at http://localhost:${ PORT }` );
      console.log(`⚛ Graphql running at http://localhost:${ PORT }${server.graphqlPath}`);
   });
});

