import { createError } from "../utils/errors.js"
import Table from "../models/Table.js"
import Restaurant from "../models/Restaurant.js"

export const createTable = async (req, res, next) => {
  const restaurantId = req.params.restaurantid
  const newTable = new Table(req.body)

  try {
    const savedTable = await newTable.save()
    try {
      await Restaurant.findByIdAndUpdate(restaurantId, {
        $push: { tables: savedTable._id },
      })
    } catch (error) {
      next(error)
    }
    res.status(200).json(savedTable)
  } catch (error) {
    next(error)
  }
}

export const updateTable = async (req, res, next) => {
  try {
    const updatedTable = await Table.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatedTable)
  } catch (error) {
    next(error)
  }
}
export const updateTableAvailability = async (req, res, next) => {
  try {
    await Table.updateOne(
      { "tableNumbers._id": req.params.id },
      {
        $push: {
          "tableNumbers.$.unavailableDates": req.body.dates,
        },
      }
    )
    res.status(200).json("Table status updated")
  } catch (error) {
    next(error)
  }
}
export const deleteTable = async (req, res, next) => {
  const RestaurantId = req.params.restaurantid
  try {
    await Table.findByIdAndDelete(req.params.id)
    try {
      await Restaurant.findByIdAndUpdate(RestaurantId, {
        $pull: { tables: req.params.id },
      })
    } catch (err) {
      next(err)
    }
    res.status(200).json("Table deleted")
  } catch (err) {
    next(err)
  }
}
export const getOneTable = async (req, res, next) => {
  try {
    const table = await Table.findById(req.params.id)
    res.status(200).json(table)
  } catch (err) {
    next(err)
  }
}
export const getAllTables = async (req, res, next) => {
  try {
    const tables = await Table.find()
    res.status(200).json(tables)
  } catch (err) {
    next(err)
  }
}
