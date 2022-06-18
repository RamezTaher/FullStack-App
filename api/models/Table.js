import mongoose from "mongoose"
const TableSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    tableNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true }
)

export default mongoose.model("Table", TableSchema)
