import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { InteractiveStage } from "./InteractiveStage";
import "./globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InteractiveStage />
  </StrictMode>,
);
