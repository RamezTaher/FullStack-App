import {
  faBed,
  faBurger,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useContext, useState } from "react"
import { Calendar, DateRange } from "react-date-range"
import "react-date-range/dist/styles.css" // main css file
import "react-date-range/dist/theme/default.css" // theme css file

import { format } from "date-fns"
import { Link, useNavigate } from "react-router-dom"
import { AuthUserContext } from "../context/AuthUserContext"
import addDays from "date-fns/addDays"
import { SearchRestaurantContext } from "../context/SearchRestaurantsContext"

const RestaurantHeader = ({ type }) => {
  const { user } = useContext(AuthUserContext)
  const { dispatch } = useContext(SearchRestaurantContext)
  const [destination, setDestination] = useState("")
  const [openDate, setOpenDate] = useState(false)
  const [dates, setDates] = useState({
    date: addDays(new Date(), 0),
  })

  const [openOptions, setOpenOptions] = useState(false)
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    table: 1,
  })

  const navigate = useNavigate()

  const handleSearch = () => {
    dispatch({ type: "new", payload: { destination, dates, options } })
    navigate("/restaurants/search", { state: { destination, dates, options } })
  }

  const handleOption = (name, action) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: action === "+" ? options[name]++ : options[name]--,
      }
    })
  }

  return (
    <>
      <header className="bg-primary text-white flex justify-center px-5 relative">
        <div
          className={`w-full max-w-6xl  mt-3 ${
            type === "list" ? "mb-0" : "mb-24"
          } `}
        >
          <div className="flex gap-10 mb-14  ">
            <Link
              to={"/"}
              style={{
                color: "inherit",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faBed} />
                <span>Stays</span>
              </div>
            </Link>
            <Link
              to={"/restaurants"}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <div className="flex items-center gap-2 border border-solid border-white py-2 px-5 rounded-3xl">
                <FontAwesomeIcon icon={faBurger} />
                <span>Restaurant</span>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCar} />
              <span>Car rentals</span>
            </div>
          </div>
          {type !== "list" && (
            <>
              <h1 className="text-5xl font-bold">
                A lifetime of discounts? It's Genius.
              </h1>
              <p className="text-2xl font-semibold my-8">
                Get rewarded for your travels – unlock instant savings of 10% or
                more with a free Booking.com account
              </p>
              {!user && (
                <Link
                  to={"/auth/signIn"}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <button className="bg-primary-tint text-white font-semibold p-2.5 cursor-pointer hover:bg-primary-tint/70 transition-all">
                    Sign in / Register
                  </button>
                </Link>
              )}

              <div className=" bg-white border-[3px] border-warning flex items-center justify-between p-2.5 rounded-md absolute -bottom-[25px] w-[95%] max-w-6xl">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faBurger} className="text-primary" />
                  <input
                    type="text "
                    placeholder="Where you Want to eat"
                    className="border-0 outline-0 placeholder:text-dark-shade text-primary"
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="text-primary"
                  />
                  <span
                    onClick={() => setOpenDate(!openDate)}
                    className="text-dark-shade cursor-pointer"
                  >
                    {`${format(dates.date, "dd/MM/yyyy")} `}
                  </span>

                  {openDate && (
                    <Calendar
                      date={new Date()}
                      onChange={(d) => setDates({ date: d })}
                      className="absolute top-12 z-20"
                    />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faPerson} className="text-primary" />
                  <span
                    className="text-dark-shade cursor-pointer"
                    onClick={() => setOpenOptions(!openOptions)}
                  >
                    {`${options.adult} adult · ${options.children} children · ${options.table} table`}
                  </span>
                  {openOptions && (
                    <div className="absolute top-16 bg-white text-dark-shade rounded-md shadow-md z-20">
                      <div className="w-[200px] py-2.5 flex justify-between m-2.5">
                        <span>Adult</span>
                        <div className="flex center gap-2.5 text-sm text-black">
                          <button
                            disabled={options.adult <= 1}
                            className="px-2.5  bg-dark disabled:cursor-not-allowed"
                            onClick={() => handleOption("adult", "-")}
                          >
                            -
                          </button>
                          <span className="">{options.adult}</span>
                          <button
                            className="px-2  bg-dark"
                            onClick={() => handleOption("adult", "+")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="w-[200px] py-2.5 flex justify-between m-2.5">
                        <span>Children</span>
                        <div className="flex center gap-2.5 text-sm text-black">
                          <button
                            disabled={options.children <= 0}
                            className="px-2.5  bg-dark disabled:cursor-not-allowed"
                            onClick={() => handleOption("children", "-")}
                          >
                            -
                          </button>
                          <span className="">{options.children}</span>
                          <button
                            className="px-2  bg-dark"
                            onClick={() => handleOption("children", "+")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="w-[200px] py-2.5 flex justify-between m-2.5">
                        <span>Table</span>
                        <div className="flex center gap-2.5 text-sm text-black">
                          <button
                            disabled={options.room <= 1}
                            className="px-2.5  bg-dark disabled:cursor-not-allowed"
                            onClick={() => handleOption("table", "-")}
                          >
                            -
                          </button>
                          <span className="">{options.room}</span>
                          <button
                            className="px-2  bg-dark"
                            onClick={() => handleOption("table", "+")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <button
                    className="bg-primary-tint text-white font-semibold py-2 px-6 cursor-pointer hover:bg-primary-tint/70 transition-all"
                    onClick={() => handleSearch()}
                  >
                    Search
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </header>
    </>
  )
}

export default RestaurantHeader
