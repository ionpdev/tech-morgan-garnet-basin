import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"

import "./index.css"
import "./css/colors.css"
import "./css/fonts.css"

const rootElement = document.getElementById("root")

if (!rootElement) {
  throw new Error("Failed to find the root element")
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
