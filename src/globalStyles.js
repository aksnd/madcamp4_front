import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Arial, sans-serif';
    background-color: #f0f4f8; /* 파스텔 블루 배경색 */
    color: #333;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #3e4a61; /* 진한 파스텔 블루 텍스트 */
  }

  p {
    color: #555; /* 부드러운 텍스트 색상 */
  }

  a {
    color: #007bff; /* 링크 색상 */
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default GlobalStyle;