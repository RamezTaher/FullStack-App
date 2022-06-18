import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignIn from "./pages/Auth/signIn"
import SignUp from "./pages/Auth/signUp"
import Home from "./pages/Home/home"
import Hotel from "./pages/Hotel/hotel"
import List from "./pages/List/list"
import RestaurantsHome from "./pages/Restaurant"
import Restaurant from "./pages/Restaurant/restaurant"
import RestaurantSearch from "./pages/Restaurant/search"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<RestaurantsHome />} />
        <Route path="/restaurants/search" element={<RestaurantSearch />} />
        <Route path="/restaurants/:id" element={<Restaurant />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
