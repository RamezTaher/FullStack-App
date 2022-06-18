import { createContext, useReducer } from "react"

const INITIAL_STATE = {
  city: undefined,
  dates: {},
  options: {
    adult: undefined,
    children: undefined,
    table: undefined,
  },
}

export const SearchRestaurantContext = createContext(INITIAL_STATE)

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "new":
      return action.payload
    case "reset":
      return INITIAL_STATE
    default:
      return state
  }
}

export const SearchRestaurantContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE)

  return (
    <SearchRestaurantContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchRestaurantContext.Provider>
  )
}
