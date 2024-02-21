const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const newSequelize = require("./config/db");

const fs = require("fs");
const typeDefs = fs.readFileSync("./schema.graphql", { encoding: "utf-8" });
const resolvers = require("./resolvers");

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

async function startApolloServer() {
  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

async function startServer() {
  try {
    await newSequelize.sync();
    await newSequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  startApolloServer();
}

startServer();
//  newSequelize.close();
