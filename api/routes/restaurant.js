import express from "express"

import {
  countByCity,
  countByType,
  createRestaurant,
  deleteRestaurant,
  getAllRestaurants,
  getOneRestaurant,
  getRestaurantTables,
  updateRestaurant,
} from "../controllers/restaurantsController.js"



const router = express.Router()

//C
router.post("/", createRestaurant)
//U
router.put("/:id", updateRestaurant)
//D
router.delete("/:id", deleteRestaurant)
///R
//R
router.get("/find/:id", getOneRestaurant)
//R ALL

//Special Endpoints
router.get("/", getAllRestaurants)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/table/:id", getRestaurantTables)

export default router
