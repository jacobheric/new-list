import * as React from "react";
import * as ReactDOM from "react-dom";
import ListComponent from "./components/list";
import { gqlClient } from "./graphqlClient";
import { ApolloProvider } from "@apollo/client";
import { Error, ErrorProvider } from "./components/error";
import "./style.css";

ReactDOM.render(
  <ErrorProvider>
    <ApolloProvider client={gqlClient}>
      <div className="w-10/12 lg:max-w-screen-lg mt-8 mx-auto">
        <Error />
        <ListComponent />
      </div>
    </ApolloProvider>
  </ErrorProvider>,
  document.getElementById("root")
);
