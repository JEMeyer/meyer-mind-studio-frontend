import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import reportWebVitals from "./utils/reportWebVitals";
import { RecoilRoot } from "recoil";

// import your fontawesome library
import "./fontawesome";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createGlobalStyle } from "styled-components";
import CredentialsProvider from "./context/credentialsProviter";
import { BrowserRouter } from "react-router-dom";
import GeneratedContentProvider from "./context/generatedContentProvider";
import MediaProvider from "./context/mediaProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const GlobalStyles = createGlobalStyle`
.svg-inline--fa {
  cursor: pointer;
}
`;

root.render(
  <GoogleOAuthProvider
    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
  >
    <React.StrictMode>
      <RecoilRoot>
        <CredentialsProvider>
          <GeneratedContentProvider>
            <MediaProvider>
              <GlobalStyles />
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </MediaProvider>
          </GeneratedContentProvider>
        </CredentialsProvider>
      </RecoilRoot>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
