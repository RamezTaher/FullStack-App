import React from "react"
import useFetch from "../hooks/useFetch"

const FeaturesRestaurants = () => {
  const { data, loading } = useFetch(
    "http://localhost:8800/api/restaurant?featured=true&limit=4"
  )

  return (
    <>
      <div className="w-full max-w-6xl grid grid-cols-4 items-center gap-5">
        {loading ? (
          "Loading..."
        ) : (
          <>
            {data.map((item) => (
              <div
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

export default FeaturesRestaurants
