import React from "react"
import { Link } from "react-router-dom"

const SearchCard = ({ item }) => {
  return (
    <>
      <div className="border border-solid border-dark p-3 rounded-md flex justify-between gap-5 ">
        <img
          src={item.photos[0]}
          alt=""
          className="w-[200px] h-[200px] object-cover"
        />
        <div className="flex flex-col gap-[6px] flex-[2]">
          <h1 className="text-lg text-primary font-semibold">{item.name}</h1>
          <span className="text-base">{item.distance}m from center</span>
          <span className="text-[14px] bg-success max-w-max p-1 rounded text-white">
            Free airport taxi
          </span>
          <span className="text-sm font-bold">
            Studio Apartment with Air conditioning
          </span>
          <span className="text-sm">{item.desc}</span>
          <span className="text-sm text-success font-bold">
            Free cancellation
          </span>
          <span className="text-sm text-success">
            You can cancel later, so lock in this great price today!
          </span>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          {item.rating && (
            <div className="flex justify-between">
              <span className="font-semibold">Excellent</span>
              <button
                className="bg-primary text-white p-1 cursor-default
            "
              >
                {item.rating}
              </button>
            </div>
          )}
          <div className=" flex flex-col gap-1 text-left">
            <span className="text-2xl">${item.cheapestPrice}</span>
            <span className="text-sm text-dark-shade">
              Includes taxes and fees
            </span>
            <Link to={`/hotels/${item._id}`}>
              <button className="bg-primary text-white font-semibold hover:bg-primary/80 transition px-5 py-2">
                See availability
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchCard
