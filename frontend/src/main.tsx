import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <h1>Diabolical</h1>
  </StrictMode>,
);
