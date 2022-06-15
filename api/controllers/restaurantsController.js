import Restaurant from "../models/Restaurant.js"
import Table from "../models/Table.js"

export const createRestaurant = async (req, res, next) => {
  const newRes = new Restaurant(req.body)

  try {
    const savedRestaurant = await newRes.save()
    res.status(200).json(savedRestaurant)
  } catch (error) {
    next(error)
  }
}
export const updateRestaurant = async (req, res, next) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.status(200).json(updatedRestaurant)
  } catch (error) {
    next(error)
  }
}
export const deleteRestaurant = async (req, res, next) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id)
    res.status(200).json("Restaurant Deleted Successfully")
  } catch (error) {
    next(error)
  }
}
export const getOneRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
    res.status(200).json(restaurant)
  } catch (error) {
    next(error)
  }
}
export const getAllRestaurants = async (req, res, next) => {
  const { min, max, ...infos } = req.query

  try {
    const restaurant = await Restaurant.find({
      ...infos,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit)
    res.status(200).json(restaurant)
  } catch (error) {
    next(error)
  }
}

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",")
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Restaurant.countDocuments({ city: city })
      })
    )
    res.status(200).json(list)
  } catch (error) {
    next(error)
  }
}

export const countByType = async (req, res, next) => {
  try {
    const frenshCount = await Restaurant.countDocuments({
      cuisine: "frensh",
    })
    const englishCount = await Restaurant.countDocuments({
      cuisine: "english",
    })
    const tunisianCount = await Restaurant.countDocuments({
      cuisine: "tunisian",
    })
    const chineeseCount = await Restaurant.countDocuments({
      cuisine: "chineese",
    })
    const turkishCount = await Restaurant.countDocuments({ cuisine: "turkish" })

    res.status(200).json([
      { cuisine: "frensh", count: frenshCount },
      { cuisine: "english", count: englishCount },
      { cuisine: "tunisian", count: tunisianCount },
      { cuisine: "chineese", count: chineeseCount },
      { cuisine: "turkish", count: turkishCount },
    ])
  } catch (error) {
    next(error)
  }
}

export const getRestaurantTables = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
    const list = await Promise.all(
      restaurant.tables.map((table) => {
        return Table.findById(table)
      })
    )
    res.status(200).json(list)
  } catch (err) {
    next(err)
  }
}
