import { createGlobalStyle } from "styled-components";

export const lightTheme = `{
   html {
      color: #000;
      background: #fff;    
   }
   button {
      background-color: #eee;
   }       
}`;

export const darkTheme = `{
   html {
      color: #fff;
      background: #000;    
   }
   input, button { 
      background-color: #333333; 
      color: #eeeeee;       
   }
}`;

const GlobalStyle = createGlobalStyle`
   @media (prefers-color-scheme: light) {
      ${ lightTheme }     
   }
   
   @media (prefers-color-scheme: no-preference) {
      ${ lightTheme }     
   }
   
   @media (prefers-color-scheme: dark) {
      ${ darkTheme }          
   }
   
   input, button {
      border: 1px solid #eee;
      border-radius: 4px;            
   }
         
   body {
      font-family: sans-serif;
      font-size: 1.1em;   
   }
`;

export default GlobalStyle;
