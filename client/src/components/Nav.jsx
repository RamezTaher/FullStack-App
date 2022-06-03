import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AuthUserContext } from "../context/AuthUserContext"

const Nav = () => {
  const { user, dispatch } = useContext(AuthUserContext)
  const [openUser, setOpenUser] = useState(false)
  const handleClick = (e) => {
    e.preventDefault()
    dispatch({ type: "SIGNOUT" })
  }
  return (
    <>
      <div className="h-[70px] bg-primary flex justify-center px-5">
        <div className="w-full max-w-6xl  text-white flex items-center justify-between">
          <Link to={"/"} style={{ color: "inherit", textDecoration: "none" }}>
            <span className="font-[500] text-2xl">LOGO</span>
          </Link>
          {user ? (
            <div className="relative">
              <div
                className="rounded-full bg-white flex items-center justify-center w-9 h-9 cursor-pointer text-primary hover:text-white hover:bg-primary transition"
                onClick={() => {
                  setOpenUser(!openUser)
                }}
              >
                <FontAwesomeIcon className="text-2xl " icon={faUser} />
              </div>
              {openUser && (
                <div className="absolute w-[150px] top-[110%] left-1/2 -translate-x-1/2 bg-white z-50 text-primary py-2 px-1 flex flex-col gap-1">
                  <div className="text-primary font-medium px-2">
                    User : {user.username}
                  </div>
                  <div
                    className="cursor-pointer font-medium hover:bg-primary hover:text-white transition px-2"
                    onClick={handleClick}
                  >
                    Sign Out
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <Link
                to={"/auth/signIn"}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <button className="bg-white text-primary px-5 py-2 cursor-pointer font-semibold hover:text-primary-tint transition-all ">
                  Login
                </button>
              </Link>

              <Link
                to={"/auth/signUp"}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <button className="bg-white text-primary px-5 py-2 cursor-pointer font-semibold hover:text-primary-tint transition-all">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Nav
