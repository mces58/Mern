import React from 'react';

import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import { ArrowBack } from '@mui/icons-material';
import { IconButton, SvgIcon } from '@mui/material';

import Alert from 'src/components/Alert';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '@fontsource/rock-3d';

const GlobalStyle = css`
  body {
    background-color: blue;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 400;
  }
`;
const StyledButton = styled.button`
  color: red;
  font-family: 'Rock 3D', sans-serif;
  font-size: 24px;
  font-weight: 700;
  font-style: italic;

  &:hover {
    color: blue;
  }
`;

function Login() {
  return (
    <div className="bg-purple-400">
      <Global styles={GlobalStyle} />
      <StyledButton type="button">Click me</StyledButton>
      <IconButton>
        <ArrowBack color="error" />

        <SvgIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
            />
          </svg>
        </SvgIcon>
      </IconButton>

      <Alert />
    </div>
  );
}

export default Login;
