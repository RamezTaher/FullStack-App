import React from "react"
import { Link } from "react-router-dom"

const SearchRestaurantCard = ({ item }) => {
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
          <span className="text-base">{item.cuisine} Recips</span>
          <span className="text-base">{item.distance}m from center</span>
          <span className="text-[14px] bg-success max-w-max p-1 rounded text-white">
            Free Drinks For family Reservation
          </span>
          <span className="text-sm font-bold">
            Great Services , Air conditioning
          </span>
          <span className="text-sm">{item.desc}</span>
          <span className="text-sm text-success font-bold">
            Free cancellation
          </span>
          <span className="text-sm text-success">
            You can cancel later, so lock in this great price today!
          </span>
        </div>
        <div className="flex-1 flex flex-col gap-5">
          {item.rating && (
            <div className="flex items-center gap-2">
              <span className="font-semibold">Excellent</span>
              <button
                className="bg-primary text-white h-4 w-4 p-4 flex items-center justify-center cursor-default
            "
              >
                {item.rating}
              </button>
            </div>
          )}
          <div className=" flex flex-col gap-1 text-left">
            <span className="text-2xl">${item.cheapestPrice}</span>

            <Link to={`/restaurants/${item._id}`}>
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

export default SearchRestaurantCard
