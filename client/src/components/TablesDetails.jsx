import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import React, { useContext, useState } from "react"
import useFetch from "../hooks/useFetch"
import { useNavigate } from "react-router-dom"
import { SearchRestaurantContext } from "../context/SearchRestaurantsContext"

const TableDetails = ({ setOpen, restaurantId }) => {
  const [selectedTables, setSelectedTables] = useState([])
  const { dates } = useContext(SearchRestaurantContext)
  console.log(dates)
  const navigate = useNavigate()

  const { data, loading } = useFetch(
    `http://localhost:8800/api/restaurant/table/${restaurantId}`
  )
  const handleClick = async () => {
    try {
      console.log(selectedTables)
      setOpen(false)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  const handleSelect = (e) => {
    const checked = e.target.checked
    const value = e.target.value
    setSelectedTables(
      checked
        ? [...selectedTables, value]
        : selectedTables.filter((item) => item !== value)
    )
  }

  return (
    <>
      <section className="w-screen p-40 h-screen bg-black/40 fixed top-0 left-0 flex items-center justify-center">
        <div className="bg-white w-1/2 h-3/4 overflow-scroll p-10  relative ">
          <div className="absolute top-1 right-2 text-lg cursor-pointer ">
            <FontAwesomeIcon
              icon={faCircleXmark}
              onClick={() => setOpen(false)}
            ></FontAwesomeIcon>
          </div>
          <span>Choose Your Rooms:</span>
          {loading ? (
            <div>Loading...</div>
          ) : (
            data &&
            data.map((item, idx) => (
              <div className="flex items-start gap-11 p-4" key={idx}>
                <div className="flex flex-col gap-1">
                  <div className="font-medium">{item.title}</div>
                  <div className="font-light">{item.desc}</div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Max People</span>{" "}
                    <span>{item.maxPeople}</span>
                  </div>
                  <div className="font-medium">Price : {item.price}</div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-dark-shade">
                  {item.tableNumbers.map((tableNumber, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <label htmlFor="number">{tableNumber.number}</label>
                      <input
                        id="number"
                        name="number"
                        type="checkbox"
                        value={tableNumber._id}
                        onChange={handleSelect}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
          <button
            className="outline-none px-3 py-2 bg-primary-tint text-white rounded w-full mt-5"
            onClick={handleClick}
          >
            Reserve Now
          </button>
        </div>
      </section>
    </>
  )
}

export default TableDetails
