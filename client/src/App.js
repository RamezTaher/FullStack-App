import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignIn from "./pages/Auth/signIn"
import Home from "./pages/Home/home"
import Hotel from "./pages/Hotel/hotel"
import List from "./pages/List/list"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/auth/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
