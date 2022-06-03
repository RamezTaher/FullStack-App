import React from "react"
import useFetch from "../hooks/useFetch"

const PropertyList = () => {
  const { data, loading } = useFetch(
    "http://localhost:8800/api/hotels/countByType"
  )

  const images = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  ]
  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <div className="w-full max-w-6xl flex justify-between gap-5">
            {data &&
              images.map((img, idx) => (
                <div
                  key={idx}
                  className="rounded-sm overflow-hidden cursor-pointer flex-1 "
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-[150px] object-cover"
                  />
                  <div className="mt-1">
                    <h1 className="text-base font-[400] uppercase">
                      {data[idx]?.type}
                    </h1>
                    <h2 className="text-lg font-semibold ">
                      {data[idx]?.count} {data[idx]?.type}
                    </h2>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </>
  )
}

export default PropertyList
