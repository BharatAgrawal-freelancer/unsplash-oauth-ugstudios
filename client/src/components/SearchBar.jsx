"use client"

import { useState, useCallback } from "react"
import { searchImages } from "../api/apiClient"

export default function SearchBar({ onSearch, onLoading }) {
  const [term, setTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = useCallback(
    async (e) => {
      e.preventDefault()
      if (!term.trim()) return

      setIsSearching(true)
      onLoading(true)

      try {
        const response = await searchImages(term)
        onSearch(response.data)
      } catch (error) {
        console.error("Search error:", error)
        alert(error.response?.data?.error || "Search failed")
      } finally {
        setIsSearching(false)
        onLoading(false)
      }
    },
    [term, onSearch, onLoading],
  )

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search for images..."
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
        />
        <button
          type="submit"
          disabled={isSearching}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition"
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>
    </form>
  )
}
