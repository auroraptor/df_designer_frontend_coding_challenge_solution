import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

if (process.env.NODE_ENV === "development") {
  import("./mocks/browser.js")
    .then(({ worker }) => worker.start())
    .then(() => {
      const container = document.getElementById("root");
      const root = createRoot(container!);
      root.render(<App />);
    });
} else {
  const container = document.getElementById("root");
  const root = createRoot(container!);
  root.render(<App />);
}
