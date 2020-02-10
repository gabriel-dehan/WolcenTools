import { createGlobalStyle } from 'styled-components';

import theme from './theme';

export default createGlobalStyle`
  /* Roboto */
  @font-face {
    font-family: ${theme.fonts.roboto.name};
    src: url('${theme.fonts.roboto.url.regular}') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: ${theme.fonts.roboto.name}-semibold;
    src: url('${theme.fonts.roboto.url.medium}') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: ${theme.fonts.roboto.name}-bold;
    src: url('${theme.fonts.roboto.url.bold}') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  /* Eina */
  @font-face {
    font-family: ${theme.fonts.eina.name}-light;
    src: url('${theme.fonts.eina.url.light}') format('truetype');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: ${theme.fonts.eina.name};
    src: url('${theme.fonts.eina.url.regular}') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: ${theme.fonts.eina.name}-italic;
    src: url('${theme.fonts.eina.url.italic}') format('truetype');
    font-weight: normal;
    font-style: italic;
  }

  @font-face {
    font-family: ${theme.fonts.eina.name}-semibold;
    src: url('${theme.fonts.eina.url.semibold}') format('truetype');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: ${theme.fonts.eina.name}-bold;
    src: url('${theme.fonts.eina.url.bold}') format('truetype');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: ${theme.fonts.eina.name}-bold-italic;
    src: url('${theme.fonts.eina.url.bold_italic}') format('truetype');
    font-weight: bold;
    font-style: italic;
  }

  html, #root {
    height: 100vh;
  }

  body {
    min-height: 100vh;
    margin: 0;
    padding: 0;
    font-family: '${theme.fonts.eina.name}', Helvetica Neue, Arial, sans-serif;
    font-weight: normal;
    font-style: normal;
    font-size: ${theme.fonts.sizes.default};
    line-height: ${theme.fonts.lineheights.default};
    color: ${theme.fonts.colors.primary};
    background: ${theme.colors.background.grey};
    overflow: hidden;
  }

  h1, h2, h3, strong  {
    font-family: '${theme.fonts.eina.name}-bold', Helvetica Neue, Arial, sans-serif;
  }

  h2 {
    font-size: ${theme.fonts.sizes.xlarge};
  }

  p {
    margin: 0;
  }

  a {
    text-decoration: none;
  }

  em {
    font-family: eina-light;
    font-style: normal;
  }

  strong {
    font-family: eina-semibold;
  }

  button {
    cursor: pointer;
  }

  input, textarea {
    font-family: inherit;
  }

  /* Change Autocomplete styles in Chrome*/
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    -webkit-text-fill-color: #222222;
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  /* Utilities classes */
  .hide {
    display: none;
  }
`;