import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App.tsx";
import "./app/Styles/index.scss";
import { ThemeProvider } from "./app/providers/ThemeProvider";
import "./shared/config/i18n/i18n";
import { ErrorBoundary } from "./app/providers/ErrorBoundary";
import { PageError } from "./widgets/PageError/ui/PageError";
import { StoreProvider } from "./app/providers/StoreProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StoreProvider>
    <React.StrictMode>
      <BrowserRouter>
        <ErrorBoundary fallback={<PageError />}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </React.StrictMode>
  </StoreProvider>
);
