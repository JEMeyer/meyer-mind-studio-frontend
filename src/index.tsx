import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import reportWebVitals from './utils/reportWebVitals';
import { RecoilRoot } from 'recoil';

// import your fontawesome library
import './fontawesome';
import { createGlobalStyle } from 'styled-components';
import CredentialsProvider from './context/credentialsProviter';
import { BrowserRouter } from 'react-router-dom';
import GeneratedContentProvider from './context/generatedContentProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const GlobalStyles = createGlobalStyle`
.svg-inline--fa {
  cursor: pointer;
}
`

root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}>
    <React.StrictMode>
      <RecoilRoot>
        <CredentialsProvider>
          <GeneratedContentProvider>
            <GlobalStyles />
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </GeneratedContentProvider>
        </CredentialsProvider>
      </RecoilRoot>
    </React.StrictMode>
  </GoogleOAuthProvider >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
