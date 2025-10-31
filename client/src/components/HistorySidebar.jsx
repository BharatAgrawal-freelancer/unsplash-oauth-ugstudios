"use client"

import { useEffect, useState } from "react"
import { getHistory } from "../api/apiClient"

export default function HistorySidebar({ onSelectTerm, isOpen, onClose }) {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isOpen) return

    const fetchHistory = async () => {
      try {
        const response = await getHistory(1, 50)
        setHistory(response.data.history)
      } catch (error) {
        console.error("Failed to fetch history:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [isOpen])

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>}

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Search History</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
              ×
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : history.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No search history yet</p>
          ) : (
            <div className="space-y-2">
              {history.map((item) => (
                <button
                  key={item._id}
                  onClick={() => {
                    onSelectTerm(item.term)
                    onClose()
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded-lg transition border border-gray-200"
                >
                  <p className="font-medium text-gray-800">{item.term}</p>
                  <p className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleDateString()}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
