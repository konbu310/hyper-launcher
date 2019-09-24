import { injectGlobal } from "emotion";

injectGlobal`
  * {
    box-sizing: border-box;
  }
  
  html {
    font-size: calc(112.5% + 0.25vw);
  }
  
  body {
   margin: 0;
   padding: 0;
   background-color: #117864;
  }
`;
