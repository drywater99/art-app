import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`


  * {
    box-sizing: border-box;
  }
  body {
    font-family: Roboto, sans-serif;
    margin: 0;
    
  }
  html, body {
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #fcfcfc;
  }
  h1, h2, h5, h6,
  ul, ol {
    margin: 0;
  }
  h3 {
    text-transform: uppercase;
    font-weight: bold;
    color: #949494;
    font-size: 16px;
    margin: 0;
  }
  p {
    margin-top: 5px;
    margin-bottom: 10px;
    color: #383838;
    font-weight: bold;
    font-size: 24px;
  }
  small {
    padding-bottom: 6px;
    font-size: 15px;
    font-weight: bold;
    color: #949494;
    line-height: 1.2;
    letter-spacing: 2px;
  }
`
