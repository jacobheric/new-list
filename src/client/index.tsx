import * as React from "react";
import * as ReactDOM from "react-dom";
import lightTheme from "./theme";
import GlobalStyle from "./theme";
import { ThemeProvider } from "styled-components";
import ListComponent from "./components/list";
import { gqlClient } from "./graphqlClient";
import { ApolloProvider } from "@apollo/client";
import { Error, ErrorProvider } from "./components/error";
import { Container } from "./components/styles";

ReactDOM.render(
  <ThemeProvider theme={lightTheme}>
    <GlobalStyle />
    <ErrorProvider>
      <ApolloProvider client={gqlClient}>
        <Error />
        <Container>
          <ListComponent />
        </Container>
      </ApolloProvider>
    </ErrorProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
