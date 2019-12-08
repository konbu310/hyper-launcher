import { injectGlobal } from "emotion";

injectGlobal`
  * {
    box-sizing: border-box;
    font-family: "Lato", sans-serif;
  }
  
  html {
    font-size: calc(112.5% + 0.25vw);
  }
  
  body {
  background-color: transparent;
   margin: 0;
   padding: 0;
   -webkit-app-region: drag;
  }
`;
