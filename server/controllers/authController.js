import User from "../models/User.js"

export const getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" })
    }

    const user = await User.findById(req.user._id).select("-__v")
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json({ message: "Logged out successfully" })
  })
}

export default { getMe, logout }
