import express from "express"

import {
  createTable,
  deleteTable,
  getAllTables,
  getOneTable,
  updateTable,
  updateTableAvailability,
} from "../controllers/restaurantTableController.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()
//C
router.post("/:restaurantid", createTable)

//U
router.put("/availability/:id", updateTableAvailability)
router.put("/:id", updateTable)

//D
router.delete("/:id", deleteTable)

//R
router.get("/find/:id", getOneTable)

//R ALL
router.get("/", getAllTables)

export default router
