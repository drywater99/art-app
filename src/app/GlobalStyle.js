import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`


  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Lato', sans-serif;
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

h2 {
  font-weight: bold;
    color: #949494;
    margin: 0;
    letter-spacing: 0.1em;
}

  h3 {
    text-transform: uppercase;
    font-weight: bold;
    color: #949494;
    font-size: 15px;
    margin: 0;
    letter-spacing: 0.1em;
  }
  p {
    margin-top: 5px;
    margin-bottom: 8px;
    color: #383838;
    font-weight: 900;
    font-size: 26px;
    line-height: 32px;
    letter-spacing: 0.1em;
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
