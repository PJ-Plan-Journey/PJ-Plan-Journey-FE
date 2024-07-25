import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: SF Pro KR, SF Pro Display, SF Pro Icons, Apple Gothic, HY Gulim, MalgunGothic, HY Dotum, Lexi Gulim, Helvetica Neue, Helvetica, Arial, sans-serif;
    background-color: #F5F5F7;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
