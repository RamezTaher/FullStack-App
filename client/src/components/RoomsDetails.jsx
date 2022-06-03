import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import React, { useContext, useState } from "react"
import useFetch from "../hooks/useFetch"
import { SearchContext } from "../context/SearchContext"
import { useNavigate } from "react-router-dom"

const RoomsDetails = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([])
  const { dates } = useContext(SearchContext)
  const navigate = useNavigate()

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    const date = new Date(start.getTime())

    const dates = []

    while (date <= end) {
      dates.push(new Date(date).getTime())
      date.setDate(date.getDate() + 1)
    }

    return dates
  }

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate)

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    )

    return !isFound
  }

  const { data, loading } = useFetch(
    `http://localhost:8800/api/hotels/room/${hotelId}`
  )
  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `http://localhost:8800/api/rooms/availability/${roomId}`,
            {
              dates: alldates,
            }
          )
          return res.data
        })
      )
      setOpen(false)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  const handleSelect = (e) => {
    const checked = e.target.checked
    const value = e.target.value
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    )
  }

  return (
    <>
      <section className="w-screen h-screen bg-black/40 fixed top-0 left-0 flex items-center justify-center">
        <div className="bg-white p-5 relative ">
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
                  <div className="font-medium">{item.price}</div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-dark-shade">
                  {item.roomNumbers.map((roomNumber, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <label htmlFor="number">{roomNumber.number}</label>
                      <input
                        id="number"
                        name="number"
                        type="checkbox"
                        value={roomNumber._id}
                        onChange={handleSelect}
                        disabled={!isAvailable(roomNumber)}
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

export default RoomsDetails
