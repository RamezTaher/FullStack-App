import React from "react"

const Mail = () => {
  return (
    <>
      <div className="w-full bg-primary text-white flex flex-col items-center gap-8 p-12">
        <div className="text-center">
          <h1 className="text-2xl font-medium">Save time, save money!</h1>
          <span className="text-base font-light">
            Sign up and we'll send the best deals to you
          </span>
        </div>

        <div className="flex items-stretch gap-2">
          <input
            type="email"
            placeholder="Your Email"
            className="w-[300px] h-9 p-2 outline-0 text-dark-shade rounded-md"
          />
          <button className="bg-primary-tint text-white font-semibold rounded-md hover:bg-primary-tint/40 px-4 transition">
            Subscribe
          </button>
        </div>
      </div>
    </>
  )
}

export default Mail
