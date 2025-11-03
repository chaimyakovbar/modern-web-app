import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App.jsx";
import SplashScreen from "./components/SplashScreen.jsx";
import { cleanTheme } from "./theme/cleanTheme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={cleanTheme}>
      <CssBaseline />
      <SplashScreen>
        <App />
      </SplashScreen>
    </ThemeProvider>
  </React.StrictMode>
);
