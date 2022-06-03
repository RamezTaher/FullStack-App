import { createContext, useEffect, useReducer } from "react"

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
}

export const AuthUserContext = createContext(INITIAL_STATE)

const AuthUserReducer = (state, action) => {
  switch (action.type) {
    case "SIGNIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      }
    case "SIGNIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      }
    case "SIGNIN_FAILURED":
      return {
        user: null,
        loading: false,
        error: action.payload,
      }
    case "SIGNOUT":
      return {
        user: null,
        loading: false,
        error: null,
      }
    default:
      return state
  }
}

export const AuthUserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthUserReducer, INITIAL_STATE)
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user))
  }, [state.user])

  return (
    <AuthUserContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  )
}
