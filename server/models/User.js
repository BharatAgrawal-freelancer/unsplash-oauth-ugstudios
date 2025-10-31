import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  provider: {
    type: String,
    required: true,
  },
  providerId: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  email: {
    type: String,
    required: true,
    index: true,
  },
  profilePhoto: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

userSchema.index({ provider: 1, providerId: 1 }, { unique: true })

export default mongoose.model("User", userSchema)
