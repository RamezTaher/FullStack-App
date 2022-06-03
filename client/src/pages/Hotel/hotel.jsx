import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons"
import React, { useContext } from "react"
import Header from "../../components/Header"
import Nav from "../../components/Nav"
import { useState } from "react"
import Mail from "../../components/Mail"
import Footer from "../../components/Footer"
import useFetch from "../../hooks/useFetch"
import { useLocation, useNavigate } from "react-router-dom"
import { SearchContext } from "../../context/SearchContext"
import { AuthUserContext } from "../../context/AuthUserContext"
import RoomsDetails from "../../components/RoomsDetails"

const Hotel = () => {
  const { user } = useContext(AuthUserContext)
  console.log(user)
  const { dates, options } = useContext(SearchContext)
  console.log(dates)
  const location = useLocation()

  const navigate = useNavigate()
  const hotelId = location.pathname.split("/")[2]
  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const { data, loading } = useFetch(
    `http://localhost:8800/api/hotels/find/${hotelId}`
  )

  //Stackoverflow fonction
  const msPerDay = 1000 * 60 * 60 * 24
  const dayDifference = (date1, date2) => {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    const diffDays = Math.ceil(timeDiff / msPerDay)
    return diffDays
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate)

  const handleOpen = (i) => {
    setSlideNumber(i)
    setOpen(true)
  }

  const handleMove = (direction) => {
    let newSlideNumber

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
    }

    setSlideNumber(newSlideNumber)
  }

  const handleClick = () => {
    if (user) {
      setOpenModal(true)
    } else {
      navigate("/auth/signin")
    }
  }
  return (
    <>
      <Nav />
      <Header type="list" />
      {loading ? (
        "Loading..."
      ) : (
        <section className="flex flex-col gap-10 items-center">
          {open && (
            <div className="fixed top-0 left-0 w-screen h-screen bg-black/40 z-50 flex items-center">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="absolute top-10 right-20 text-3xl text-secondary cursor-pointer  "
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className=" text-3xl text-secondary cursor-pointer absolute top-1/2 left-20"
                onClick={() => handleMove("l")}
              />
              <div className="w-full h-full flex justify-center items-center">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="w-[75%] h-[80vh]"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className=" text-3xl text-secondary cursor-pointer absolute top-1/2 right-20"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="w-full max-w-6xl flex flex-col gap-2 relative mt-20">
            <button
              className="absolute top-[10px] right-0 p-3 bg-primary-tint text-white hover:bg-primary-tint/70 transition rounded-md font-bold"
              onClick={handleClick}
            >
              Reserve or Book Now!
            </button>
            <h1 className="text-2xl font-semibold">{data.name}</h1>
            <div className="text-sm flex items-center gap-2">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="text-primary-tint font-[500]">
              Excellent location – {data.distance}m from center
            </span>
            <span className="text-success font-[500]">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="grid grid-cols-3 gap-2 mt-5">
              {data.photos?.map((photo, i) => (
                <div className="col-span-1" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between gap-5 mt-5">
              <div className="flex-[3]">
                <h1 className="text-2xl text-dark-shade font-bold">
                  {data.title}
                </h1>
                <p className="text-base mt-5">{data.desc}</p>
              </div>
              <div className="flex-1 bg-secondary p-5 flex flex-col gap-5">
                <h1 className="text-xl font-bold text-dark-shade">
                  Perfect for a {days}-night stay!
                </h1>
                <span className="text-base ">
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2 className="flex items-center gap-2">
                  <span className="font-bold text-lg">
                    ${days * data.cheapestPrice * options.room}
                  </span>
                  <span> ({days} nights)</span>
                </h2>
                <button
                  className="p-3 bg-primary-tint text-white hover:bg-primary-tint/70 transition rounded-md font-bold "
                  onClick={handleClick}
                >
                  Reserve or Book Now!
                </button>
              </div>
            </div>
          </div>
          <Mail />
          <Footer />
        </section>
      )}
      {openModal && <RoomsDetails setOpen={setOpenModal} hotelId={hotelId} />}
    </>
  )
}

export default Hotel
