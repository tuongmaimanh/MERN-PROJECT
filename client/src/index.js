import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SearchContextProvider } from "./contexts/SearchContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PayPalScriptProvider options={{ "client-id": "ATTZup1nQWGENf7pApA0kR1J0dB-u2iHVmD1VipoB3QQsrzt1QpZFUnRm735lPmCE6KpIU0r9I_WkAvx" }}>
      <AuthContextProvider>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </AuthContextProvider>
    </PayPalScriptProvider>
  </React.StrictMode>
);
