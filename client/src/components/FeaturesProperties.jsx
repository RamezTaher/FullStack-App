import React, { useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { SearchContext } from "../context/SearchContext"
import useFetch from "../hooks/useFetch"
import { useNavigate } from "react-router-dom"
import addDays from "date-fns/addDays"

const FeaturesProperties = () => {
  const { data, loading } = useFetch(
    "http://localhost:8800/api/hotels?featured=true&limit=4"
  )

  const [destination, setDestination] = useState("")
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ])

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  })
  const navigate = useNavigate()

  const { dispatch } = useContext(SearchContext)
  const handleSearch = (d, id) => {
    console.log(d)
    dispatch({ type: "new", payload: { destination: d, dates, options } })
    navigate(`/hotels/${id}`, { state: { destination: d, dates, options } })
  }

  return (
    <>
      <div className="w-full max-w-6xl grid grid-cols-4 items-center  gap-5">
        {loading ? (
          "Loading..."
        ) : (
          <>
            {data.map((item) => (
              <div
                onClick={() => {
                  handleSearch(item.city, item._id)
                }}
                className="col-span-1 gap-2 flex flex-col cursor-pointer"
                key={item._id}
              >
                <img
                  src={item.photos[0]}
                  alt=""
                  className="w-full object-cover h-[250px] rounded-md"
                />
                <span className="font-bold">{item.name}</span>
                <span className="font-[300]">{item.city}</span>
                <span className="font-[500]">
                  Starting from ${item.cheapestPrice}
                </span>
                {item.rating && (
                  <div className="flex items-center gap-2">
                    <button className="bg-primary text-white p-1 font-bold rounded-sm ">
                      {item.rating}
                    </button>
                    <span className="text-base">Excellent</span>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default FeaturesProperties
