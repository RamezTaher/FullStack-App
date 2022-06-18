import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import Header from "../../components/Header"
import Nav from "../../components/Nav"
import { format } from "date-fns"
import { Calendar, DateRange } from "react-date-range"
import SearchCard from "../../components/SearchCard"

import useFetch from "../../hooks/useFetch"
import RestaurantHeader from "../../components/RestaurantHeader"
import SearchRestaurantCard from "../../components/SearchRestaurantCard"

const RestaurantSearch = () => {
  const location = useLocation()

  // eslint-disable-next-line
  const [destination, setDestination] = useState(location.state.destination)
  const [dates, setDates] = useState(location.state.dates)
  // eslint-disable-next-line
  const [options, setOptions] = useState(location.state.options)
  const [openDate, setOpenDate] = useState(false)
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)

  const { data, loading, fetchAgain } = useFetch(
    `http://localhost:8800/api/restaurant?city=${destination}&min=${
      min || 0
    }&max=${max || 999}`
  )

  console.log(location)

  const handleSearch = () => {
    fetchAgain()
  }
  return (
    <>
      <Nav />
      <RestaurantHeader type="list" />
      <section className="flex justify-center mt-5 py-10">
        <div className="w-full max-w-6xl flex gap-5">
          <div className="flex-1 bg-warning p-4 rounded-md h-fit sticky top-3">
            <h1 className="text-xl text-dark-shade mb-3 font-bold ">Search</h1>
            <div className="flex flex-col gap-2 mb-3">
              <label htmlFor="destination" className="text-sm ">
                Destination
              </label>
              <input
                name="destination"
                id="destination"
                type="text"
                placeholder={destination}
                className="outline-none h-8 border-0 p-1 placeholder:text-dark-shade placeholder:text-sm placeholder:font-normal text-sm  font-normal
                "
              />
            </div>
            <div className="flex flex-col gap-2 mb-3 text-dark-shade">
              <label htmlFor="date" className="text-sm ">
                Check-in Date
              </label>
              <span
                onClick={() => setOpenDate(!openDate)}
                className="h-8 p-1 bg-white text-dark-shade flex items-center cursor-pointer"
              >
                {`${format(dates.date, "dd/MM/yyyy")} `}
              </span>
              {openDate && (
                <Calendar
                  onChange={(d) => setDates({ date: d })}
                  date={dates.date}
                />
              )}
            </div>
            <div>
              <label htmlFor="options" className="text-sm">
                Options
              </label>
              <div className="p-2">
                <div className="flex justify-between mb-3 text-dark-shade text-sm font-medium">
                  <span>
                    Min Price <small>per table</small>
                  </span>
                  <input
                    onChange={(e) => setMin(e.target.value)}
                    type="number"
                    className="w-[60px] outline-none text-center placeholder:text-dark-shade "
                  />
                </div>
                <div className="flex justify-between mb-3 text-dark-shade text-sm font-medium ">
                  <span>
                    Max Price <small>per table</small>
                  </span>
                  <input
                    onChange={(e) => setMax(e.target.value)}
                    type="number"
                    className="w-[60px] outline-none text-center placeholder:text-dark-shade"
                  />
                </div>
                <div className="flex justify-between mb-3 text-dark-shade text-sm font-medium">
                  <span>Adult</span>
                  <input
                    min={1}
                    type="number"
                    placeholder={options.adult}
                    className="w-[60px] outline-none text-center placeholder:text-dark-shade"
                  />
                </div>
                <div className="flex justify-between mb-3 text-dark-shade text-sm font-medium">
                  <span>Children</span>
                  <input
                    min={0}
                    type="number"
                    placeholder={options.children}
                    className="w-[60px] outline-none text-center placeholder:text-dark-shade"
                  />
                </div>
                <div className="flex justify-between mb-3 text-dark-shade text-sm font-medium">
                  <span>Table</span>
                  <input
                    min={1}
                    type="number"
                    placeholder={options.table}
                    className="w-[60px] outline-none text-center placeholder:text-dark-shade"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                handleSearch()
              }}
              className="bg-primary-tint text-white font-semibold rounded-sm hover:bg-primary-tint/80 p-2 w-full transition mt-3"
            >
              Search
            </button>
          </div>
          <div className="flex-[3] flex flex-col gap-5">
            {loading ? (
              "Loading..."
            ) : (
              <>
                {data.map((item) => (
                  <SearchRestaurantCard key={item._id} item={item} />
                ))}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default RestaurantSearch
