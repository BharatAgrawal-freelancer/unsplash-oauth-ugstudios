import mongoose from "mongoose"

const searchSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  term: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    index: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },
})

searchSchema.index({ userId: 1, timestamp: -1 })

export default mongoose.model("Search", searchSchema)
