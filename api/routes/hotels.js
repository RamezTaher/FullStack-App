import express from "express"
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotelRooms,
  getOneHotel,
  updateHotel,
} from "../controllers/hotelsController.js"

import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()

//C
router.post("/", createHotel)
//U
router.put("/:id", updateHotel)
//D
router.delete("/:id", deleteHotel)
///R
//R
router.get("/find/:id", getOneHotel)
//R ALL

//Special Endpoints
router.get("/", getAllHotels)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/room/:id", getHotelRooms)

export default router
