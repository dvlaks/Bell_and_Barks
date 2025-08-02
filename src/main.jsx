import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PerformanceMonitor } from "./utils/performance.js";

// Initialize performance monitoring
PerformanceMonitor.monitorCoreWebVitals();
PerformanceMonitor.monitorAnimationFrame();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
