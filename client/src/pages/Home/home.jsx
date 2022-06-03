import React from "react"
import Features from "../../components/Features"
import FeaturesProperties from "../../components/FeaturesProperties"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import Mail from "../../components/Mail"
import Nav from "../../components/Nav"
import PropertyList from "../../components/PropertyList"

const Home = () => {
  return (
    <div>
      <Nav />
      <Header />
      <section className="mt-20 flex flex-col items-center gap-14">
        <section>
          <Features />
        </section>
        <section className="flex flex-col gap-6">
          <h1 className="w-[1152px] text-2xl font-bold">
            Browse by property type
          </h1>
          <PropertyList />
        </section>

        <section className="flex flex-col gap-6">
          <h1 className="w-[1152px] text-2xl font-bold">Homes guests love</h1>
          <FeaturesProperties />
        </section>

        <section className="w-full">
          <Mail />
        </section>

        <Footer />
      </section>
    </div>
  )
}

export default Home
