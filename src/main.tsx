import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ErrorBoundary } from "./components/ErrorBoundary";

// Initialize monitoring and analytics
import { initSentry } from "./lib/sentry";
import { initPostHog } from "./lib/analytics";
import { initGtag } from "./lib/gtag";

// Initialize Sentry for error tracking
initSentry();

// Initialize PostHog for analytics
initPostHog();

// Initialize Google Analytics and conversion tracking
initGtag();

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
