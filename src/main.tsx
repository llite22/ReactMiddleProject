import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App.tsx";
import "./app/Styles/index.scss";
import { ThemeProvider } from "./app/providers/ThemeProvider";
import "./shared/config/i18n/i18n";
import { ErrorBoundary } from "./app/providers/ErrorBoundary";
import { StoreProvider } from "./app/providers/StoreProvider";
import { PageError } from "./widgets/PageError/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary fallback={<PageError />}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>
);
