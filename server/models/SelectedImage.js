import mongoose from "mongoose"

const selectedImageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  imageId: {
    type: String,
    required: true,
  },
  imageUrl: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

selectedImageSchema.index({ userId: 1, imageId: 1 }, { unique: true })

export default mongoose.model("SelectedImage", selectedImageSchema)
