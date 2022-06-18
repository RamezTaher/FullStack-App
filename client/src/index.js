import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { SearchContextProvider } from "./context/SearchContext"
import { AuthUserContextProvider } from "./context/AuthUserContext"
import "./index.css"
import { SearchRestaurantContextProvider } from "./context/SearchRestaurantsContext"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <SearchContextProvider>
      <SearchRestaurantContextProvider>
        <AuthUserContextProvider>
          <App />
        </AuthUserContextProvider>
      </SearchRestaurantContextProvider>
    </SearchContextProvider>
  </React.StrictMode>
)
