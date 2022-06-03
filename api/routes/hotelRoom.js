import express from "express"
import {
  createRoom,
  deleteRoom,
  getOneRoom,
  getAllRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/hotelRoomController.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()
//C
router.post("/:hotelid", createRoom)

//U
router.put("/availability/:id", updateRoomAvailability)
router.put("/:id", updateRoom)

//D
router.delete("/:id", deleteRoom)

//R
router.get("/find/:id", getOneRoom)

//R ALL
router.get("/", getAllRooms)

export default router
