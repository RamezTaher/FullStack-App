import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthUserContext } from "../../context/AuthUserContext"

const SignIn = () => {
  const [infos, setInfos] = useState({
    username: undefined,
    password: undefined,
  })

  const { loading, error, dispatch } = useContext(AuthUserContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setInfos((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    dispatch({ type: "SIGNIN_START" })
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/signin",
        infos
      )

      if (res.data.isAdmin) {
        dispatch({ type: "SIGNIN_SUCCESS", payload: res.data.details })
        navigate("/")
      } else {
        dispatch({
          type: "SIGNIN_FAILURED",
          payload: { message: "You are not allowed" },
        })
      }
    } catch (error) {
      dispatch({ type: "SIGNIN_FAILURED", payload: error.response.data })
    }
  }

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-20 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-primary text-3xl font-bold mb-10">
            Logo
          </h2>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <button
                disabled={loading}
                onClick={handleClick}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </form>

            {error && (
              <div className="text-center text-danger mt-5">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
