import axios from "axios"

const API_BASE_URL = "http://localhost:5000"

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

// Auth endpoints
export const getMe = () => apiClient.get("/api/me")
export const logout = () => apiClient.post("/auth/logout")

// Search endpoints
export const searchImages = (term, page = 1, perPage = 20) => apiClient.post("/api/search", { term, page, perPage })

// History endpoints
export const getHistory = (page = 1, limit = 20) => apiClient.get("/api/history", { params: { page, limit } })

export const getTopSearches = () => apiClient.get("/api/top-searches")

// Selection endpoints
export const saveSelection = (images) => apiClient.post("/api/save-selection", { images })

export const getSelectedImages = () => apiClient.get("/api/selected-images")

export const deleteSelection = (imageId) => apiClient.delete(`/api/selected-images/${imageId}`)

export default apiClient
