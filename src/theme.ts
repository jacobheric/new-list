import { createGlobalStyle } from "styled-components";

export const lightTheme = {
   primary: "#fff"
};

export const darkTheme = {
   primary: "#000"
};

// 2. interpolate it using tagged template literals
const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: sans-serif;
    font-size: 16px;
  }
`;

export default GlobalStyle;
