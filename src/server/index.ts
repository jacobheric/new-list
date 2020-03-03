import express from "express";
import { ApolloServer } from "apollo-server-express";
import { db, migrate } from "./db";
import { resolvers, typeDefs } from "./graphql";
import ParcelBundler from "parcel-bundler";
import { feature, HOST, PORT } from "../config";
import * as path from "path";
import * as http from "http";

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({
  app
});

const httpServer = http.createServer(app);

if (feature.realTime) {
  server.installSubscriptionHandlers(httpServer);
}

//
// use parcel bundler in dev for hot module reloading
if (process.env.NODE_ENV === "dev") {
  const bundler = new ParcelBundler("src/client/index.html");
  console.log("running in dev mode with hot module replacement");
  app.use(bundler.middleware());
} else {
  app.use(express.static(path.join(__dirname, "/client")));
}

db.then(async () => {
  httpServer.listen(PORT, () => {
    console.log(`⚛ Server running at http://${HOST}:${PORT}`);
    console.log(
      `⚛ GraphQL running at http://${HOST}:${PORT}${server.graphqlPath}\n`
    );
  });
});
