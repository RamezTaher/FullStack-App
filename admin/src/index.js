import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { AuthUserContextProvider } from "./context/AuthUserContext"
import { DarkModeContextProvider } from "./context/darkModeContext"
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <AuthUserContextProvider>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </AuthUserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
