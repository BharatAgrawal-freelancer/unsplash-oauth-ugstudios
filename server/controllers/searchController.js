import Search from "../models/Search.js"
import { searchPhotos } from "../config/unsplash.js"

const searchCache = new Map()
const CACHE_TTL = 60000 // 1 minute

export const search = async (req, res) => {
  try {
    const { term, page = 1, perPage = 20 } = req.body

    if (!term || term.trim().length === 0) {
      return res.status(400).json({ error: "Search term is required" })
    }

    const normalizedTerm = term.toLowerCase().trim()

    // Save search to database
    await Search.create({
      userId: req.user._id,
      term: normalizedTerm,
    })

    // Check cache
    const cacheKey = `${normalizedTerm}-${page}-${perPage}`
    if (searchCache.has(cacheKey)) {
      const cached = searchCache.get(cacheKey)
      if (Date.now() - cached.timestamp < CACHE_TTL) {
        return res.json({ term: normalizedTerm, ...cached.data })
      }
    }

    // Fetch from Unsplash
    const results = await searchPhotos(normalizedTerm, page, perPage)

    // Cache results
    searchCache.set(cacheKey, {
      data: results,
      timestamp: Date.now(),
    })

    res.json({ term: normalizedTerm, ...results })
  } catch (error) {
    console.error("[SEARCH ERROR]", error.message)
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}

export default { search }
