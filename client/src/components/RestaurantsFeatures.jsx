import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import addDays from "date-fns/addDays"
import { SearchRestaurantContext } from "../context/SearchRestaurantsContext"

const RestaurantFeatures = () => {
  const { dispatch } = useContext(SearchRestaurantContext)
  const [destination, setDestination] = useState("")

  const [dates, setDates] = useState({
    date: addDays(new Date(), 0),
  })

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    table: 1,
  })
  const { data, loading } = useFetch(
    "http://localhost:8800/api/restaurant/countByCity?cities=Hammamet,Soussa,Tabarka"
  )

  const navigate = useNavigate()

  const handleSearch = (d) => {
    console.log(d)
    dispatch({ type: "new", payload: { destination: d, dates, options } })
    navigate("/restaurants/search", {
      state: { destination: d, dates, options },
    })
  }

  return (
    <>
      {loading ? (
        "Loading ..."
      ) : (
        <div className="w-full max-w-6xl flex justify-between gap-5 z-10">
          <div
            className="relative text-white overflow-hidden rounded-md h-[250px] cursor-pointer "
            onClick={() => {
              handleSearch("Hammamet")
            }}
          >
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
              alt=""
              className="w-full object-cover "
            />
            <div className="absolute bottom-5 left-5">
              <h1 className="text-2xl font-bold ">Hammamet</h1>
              <h2 className="text-lg font-semibold">{data[0]} properties</h2>
            </div>
          </div>
          <div
            className="relative text-white overflow-hidden rounded-md h-[250px] cursor-pointer"
            onClick={() => {
              handleSearch("Soussa")
            }}
          >
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
              alt=""
              className="w-full object-cover "
            />
            <div className="absolute bottom-5 left-5">
              <h1 className="text-2xl font-bold ">Sousse</h1>
              <h2 className="text-lg font-semibold">{data[1]} properties</h2>
            </div>
          </div>
          <div
            className="relative text-white overflow-hidden rounded-md h-[250px] cursor-pointer"
            onClick={() => {
              handleSearch("Tabarka")
            }}
          >
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
              alt=""
              className="w-full object-cover "
            />
            <div className="absolute bottom-5 left-5">
              <h1 className="text-2xl font-bold ">Tabarka</h1>
              <h2 className="text-lg font-semibold">{data[2]} properties</h2>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RestaurantFeatures
