import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import hotelRoomRoute from "./routes/hotelRoom.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

dotenv.config()

const connectToBd = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ULR)
    console.log("Connected to DB")
  } catch (error) {
    throw error
  }
}

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())



app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", hotelRoomRoute)

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something is wrong"
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  })
})

app.listen(8800, () => {
  connectToBd()
  console.log("connected to backend")
})
