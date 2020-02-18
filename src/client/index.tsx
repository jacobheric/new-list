import * as React from 'react'
import * as ReactDOM from 'react-dom'
import lightTheme from "./theme";
import GlobalStyle from "./theme";
import { ThemeProvider } from "styled-components";
import ListComponent from "./components/list";
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from "./graphqlClient";

ReactDOM.render(
   <ThemeProvider theme={lightTheme}>
      <GlobalStyle/>
      <ApolloProvider client={client}>
         <ListComponent/>
      </ApolloProvider>
   </ThemeProvider>,
   document.getElementById('root')
);
