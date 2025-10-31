"use client"

import { useSelection } from "../context/SelectionContext"
import { saveSelection } from "../api/apiClient"
import { useState } from "react"

export default function SelectionCounter() {
  const { selectedImages, clearSelection } = useSelection()
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (selectedImages.length === 0) return

    setIsSaving(true)
    try {
      const imagesToSave = selectedImages.map((img) => ({
        id: img.id,
        url: img.urls.regular,
        description: img.alt,
      }))

      await saveSelection(imagesToSave)
      alert(`Saved ${selectedImages.length} images!`)
      clearSelection()
    } catch (error) {
      console.error("Save failed:", error)
      alert("Failed to save images")
    } finally {
      setIsSaving(false)
    }
  }

  if (selectedImages.length === 0) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <span className="text-lg font-semibold">Selected: {selectedImages.length} images</span>
        <div className="flex gap-3">
          <button onClick={clearSelection} className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-lg transition">
            Clear
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 rounded-lg font-semibold transition"
          >
            {isSaving ? "Saving..." : "Save Selection"}
          </button>
        </div>
      </div>
    </div>
  )
}
