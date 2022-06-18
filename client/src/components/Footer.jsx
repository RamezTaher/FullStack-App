import React from "react"

const Footer = () => {
  return (
    <>
      <footer className="w-full max-w-6xl text-sm pb-3">
        <div className="w-full flex justify-between mb-10">
          <ul className="p-0 flex flex-col gap-2 text-primary text-[14px]">
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Countries
            </li>
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Regions
            </li>
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Cities
            </li>
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Districts
            </li>
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Airports
            </li>
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Hotels
            </li>
          </ul>
          <ul className="p-0 flex flex-col gap-2 text-primary text-[14px]">
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Homes{" "}
            </li>
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Apartments{" "}
            </li>
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Resorts{" "}
            </li>
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Villas
            </li>
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Hostels
            </li>
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Guest houses
            </li>
          </ul>
          <ul className="p-0 flex flex-col gap-2 text-primary text-[14px]">
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Unique places to stay{" "}
            </li>
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Reviews
            </li>
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Unpacked: Travel articles{" "}
            </li>
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Travel communities{" "}
            </li>
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Seasonal and holiday deals{" "}
            </li>
          </ul>
          <ul className="p-0 flex flex-col gap-2 text-primary text-[14px]">
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Car rental{" "}
            </li>
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Flight Finder
            </li>
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Restaurant reservations{" "}
            </li>
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Travel Agents{" "}
            </li>
          </ul>
          <ul className="p-0 flex flex-col gap-2 text-primary text-[14px]">
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Curtomer Service
            </li>
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Partner Help
            </li>
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Careers
            </li>
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Sustainability
            </li>
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Press center
            </li>
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Safety Resource Center
            </li>
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Investor relations
            </li>
            <li className=" cursor-pointer hover:text-warning-shade transition">
              Terms & conditions
            </li>
          </ul>
        </div>
        <div className="text-center text-sm font-medium">
          Copyright © {new Date().getFullYear()} Royal Rental.
        </div>
      </footer>
    </>
  )
}

export default Footer
