import React from "react"
import Features from "../../components/Features"
import FeaturesProperties from "../../components/FeaturesProperties"
import FeaturesRestaurants from "../../components/FeaturesRestaurants"
import Footer from "../../components/Footer"
import Mail from "../../components/Mail"
import Nav from "../../components/Nav"
import PropertyList from "../../components/PropertyList"
import RestaurantHeader from "../../components/RestaurantHeader"
import RestaurantFeatures from "../../components/RestaurantsFeatures"

const RestaurantsHome = () => {
  return (
    <div>
      <Nav />
      <RestaurantHeader />
      <section className="mt-20 flex flex-col items-center gap-14">
        <section>
          <RestaurantFeatures />
        </section>

        <section className="flex flex-col gap-6">
          <h1 className="w-[1152px] text-2xl font-bold">Homes guests love</h1>
          <FeaturesRestaurants />
        </section>

        <section className="w-full">
          <Mail />
        </section>

        <Footer />
      </section>
    </div>
  )
}

export default RestaurantsHome
