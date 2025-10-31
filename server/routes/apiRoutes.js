import express from "express"
import ensureAuth from "../middleware/auth.js"
import searchLimiter from "../middleware/rateLimiter.js"
import { search } from "../controllers/searchController.js"
import { getHistory, getTopSearches } from "../controllers/historyController.js"
import { getMe } from "../controllers/authController.js"
import { saveSelection, getSelectedImages, deleteSelection } from "../controllers/selectionController.js"

const router = express.Router()

// Auth endpoints
router.get("/me", ensureAuth, getMe)

// Search endpoints
router.post("/search", search)

// History endpoints
router.get("/history", ensureAuth, getHistory)
router.get("/top-searches", ensureAuth, getTopSearches)

// Selection endpoints
router.post("/save-selection", ensureAuth, saveSelection)
router.get("/selected-images", ensureAuth, getSelectedImages)
router.delete("/selected-images/:imageId", ensureAuth, deleteSelection)

export default router
