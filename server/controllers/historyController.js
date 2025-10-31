import Search from "../models/Search.js"

export const getHistory = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query
    const skip = (page - 1) * limit

    const history = await Search.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(Number.parseInt(limit))

    const total = await Search.countDocuments({ userId: req.user._id })

    res.json({
      history,
      pagination: {
        page: Number.parseInt(page),
        limit: Number.parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getTopSearches = async (req, res) => {
  try {
    const topSearches = await Search.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: "$term", count: { $sum: 1 }, lastSearched: { $max: "$timestamp" } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ])

    res.json(topSearches)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default { getHistory, getTopSearches }
