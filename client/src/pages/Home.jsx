"use client"

import { useState } from "react"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import ImageGrid from "../components/ImageGrid"
import TopSearches from "../components/TopSearches"
import HistorySidebar from "../components/HistorySidebar"
import SelectionCounter from "../components/SelectionCounter"

export default function Home() {
  const [searchResults, setSearchResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)

  const handleSearch = (results) => {
    setSearchResults(results)
  }

  const handleSelectTerm = (term) => {
    // Trigger search with the selected term
    const form = document.querySelector("form")
    const input = form.querySelector("input")
    input.value = term
    form.dispatchEvent(new Event("submit", { bubbles: true }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} onLoading={setIsLoading} />

        <TopSearches onSelectTerm={handleSelectTerm} />

        <button
          onClick={() => setHistoryOpen(true)}
          className="mb-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
        >
          📋 View History
        </button>

        {searchResults && (
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Results for "{searchResults.term}" ({searchResults.total} found)
            </h2>
            <ImageGrid images={searchResults.results} isLoading={isLoading} />
          </div>
        )}
      </main>

      <HistorySidebar isOpen={historyOpen} onClose={() => setHistoryOpen(false)} onSelectTerm={handleSelectTerm} />

      <SelectionCounter />
    </div>
  )
}
