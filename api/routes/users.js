import express from "express"
import {
  deleteUser,
  getAllUsers,
  getOneUser,
  updateUser,
} from "../controllers/usersController.js"
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()

router.get("/checkauth", verifyToken, (req, res, next) => {
  res.send("auth succ")
})
router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send("auth succ and u can update ")
})
router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
  res.send("auth succ and u can update all ")
})

//U
router.put("/:id", updateUser)
//D
router.delete("/:id", deleteUser)
///R
//R
router.get("/find/:id", getOneUser)
//R ALL
router.get("/", getAllUsers)

export default router
