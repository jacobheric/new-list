import * as React from 'react'
import * as ReactDOM from 'react-dom'
import lightTheme from "./theme";
import GlobalStyle from "./theme";
import { ThemeProvider } from "styled-components";
import ListComponent from "./components/list";
import { gqlClient } from "./graphqlClient";
import { ApolloProvider } from "@apollo/client";

ReactDOM.render(
   <ThemeProvider theme={lightTheme}>
      <GlobalStyle/>
      <ApolloProvider client={gqlClient}>
         <ListComponent/>
      </ApolloProvider>
   </ThemeProvider>,
   document.getElementById('root')
);
