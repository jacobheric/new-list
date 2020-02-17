import * as React from 'react'
import * as ReactDOM from 'react-dom'
import lightTheme from "./theme";
import GlobalStyle from "./theme";
import { ThemeProvider } from "styled-components";
import ListComponent from "./components/list";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
   uri: `http://localhost:${3000}/graphql`,
});

ReactDOM.render(
   <ThemeProvider theme={lightTheme}>
      <GlobalStyle/>
      <ApolloProvider client={client}>
         <ListComponent/>
      </ApolloProvider>
   </ThemeProvider>,
   document.getElementById('root')
);
