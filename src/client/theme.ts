import { createGlobalStyle } from "styled-components";

export const lightTheme = {
   color: "#000",
   background: "#fff"
};

export const darkTheme = {
   color: "#fff",
   background: "#000"
};

// 2. interpolate it using tagged template literals
const GlobalStyle = createGlobalStyle`
   @media (prefers-color-scheme: light) {
      html { ${ lightTheme } }     
   }
   
   @media (prefers-color-scheme: no-preference) {
      html { ${ lightTheme } }     
   }
   
   @media (prefers-color-scheme: dark) {
      html { ${ darkTheme } }
      input { 
         background-color: #333333; 
         color: #eeeeee;
      }        
   }
         
   input {
      border: 1px solid rgba(0,0,0,0.15);
      border-radius: 4px       
   }   
   
   body {
      padding: 0;
      margin: 0;
      font-family: sans-serif;
      font-size: 1em;   
   }
`;

export default GlobalStyle;
