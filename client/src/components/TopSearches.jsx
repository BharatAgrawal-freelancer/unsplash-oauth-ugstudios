"use client"

import { useEffect, useState } from "react"
import { getTopSearches } from "../api/apiClient"

export default function TopSearches({ onSelectTerm }) {
  const [topSearches, setTopSearches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTopSearches = async () => {
      try {
        const response = await getTopSearches()
        setTopSearches(response.data)
      } catch (error) {
        console.error("Failed to fetch top searches:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTopSearches()
  }, [])

  if (loading || topSearches.length === 0) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 mb-8 border border-indigo-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Top Searches</h3>
      <div className="flex flex-wrap gap-2">
        {topSearches.map((search) => (
          <button
            key={search._id}
            onClick={() => onSelectTerm(search._id)}
            className="px-4 py-2 bg-white border-2 border-indigo-300 text-indigo-700 rounded-full hover:bg-indigo-50 transition font-medium text-sm"
          >
            {search._id} <span className="text-xs text-gray-500">({search.count})</span>
          </button>
        ))}
      </div>
    </div>
  )
}
