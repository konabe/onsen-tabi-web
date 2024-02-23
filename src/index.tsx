import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "sanitize.css";
import "sanitize.css/forms.css";
import "sanitize.css/typography.css";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration({
      tracePropagationTargets: ["localhost", import.meta.env.VITE_BASE_URL!],
    }),
    Sentry.replayIntegration(),
    Sentry.feedbackIntegration({
      colorScheme: "system",
    }),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
