import * as React from 'react'
import * as ReactDOM from 'react-dom'
import lightTheme from "./theme";
import GlobalStyle from "./theme";
import { ThemeProvider } from "styled-components";
import ListComponent from "~components/list";


ReactDOM.render(
   <ThemeProvider theme={lightTheme}>
      <GlobalStyle/>
      <ListComponent/>
   </ThemeProvider>,
   document.getElementById('root')
);

