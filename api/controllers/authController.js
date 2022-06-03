import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/errors.js"
import jwt from "jsonwebtoken"

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    const newUser = new User({
      ...req.body,
      password: hash,
    })
    await newUser.save()
    res.status(200).send("signedUp succ")
  } catch (error) {
    
    next(error)
  }
}

export const signin = async (req, res, next) => {
  try {
    //Check Username
    const user = await User.findOne({ username: req.body.username })
    if (!user) return next(createError(404), "No user")

    //CheckPassword
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!isPasswordCorrect) return next(createError(400), "Wrong password")

    //Creating new Token with JWT (pfeapp = secret Key)
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    )

    //Not sending the password if the auth was successful
    const { password, isAdmin, ...infos } = user._doc

    //Auth successfully
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ details: { ...infos }, isAdmin })
  } catch (error) {
    console.log(req.body)
    next(error)
  }
}
