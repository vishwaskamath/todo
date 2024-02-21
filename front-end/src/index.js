import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Todos from "./Todos";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";


const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Your GraphQL endpoint URL
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <Todos />
  </ApolloProvider>
);
