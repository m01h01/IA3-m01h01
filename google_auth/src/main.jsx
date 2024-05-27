import React from "react";
import ReactDOM from "react-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";

const clientId = "769108889554-foh8q80bbf4gam0u0aa08s58eka6p82i.apps.googleusercontent.com"; 

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
