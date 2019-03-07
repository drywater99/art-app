import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    margin: 0;
  }

  html, body {
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  h1, h2, h4, h5, h6,
  ul, ol {
    margin: 0;
  }

  h3 {
    text-transform: uppercase;
    color: #949494;
    font-size: 15px;
    margin: 0;
  }

  p {
    margin-top: 10px;
    margin-bottom: 12px;
    color: #383838;
    font-weight: bold;
    font-size: 24px;
  }

`
