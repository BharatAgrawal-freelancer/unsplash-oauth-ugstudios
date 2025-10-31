"use client"

import { createContext, useContext, useState, useEffect } from "react"

const SelectionContext = createContext()

export const SelectionProvider = ({ children }) => {
  const [selectedImages, setSelectedImages] = useState(() => {
    const saved = localStorage.getItem("selectedImages")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("selectedImages", JSON.stringify(selectedImages))
  }, [selectedImages])

  const toggleSelection = (image) => {
    setSelectedImages((prev) => {
      const exists = prev.find((img) => img.id === image.id)
      if (exists) {
        return prev.filter((img) => img.id !== image.id)
      }
      return [...prev, image]
    })
  }

  const isSelected = (imageId) => selectedImages.some((img) => img.id === imageId)

  const clearSelection = () => setSelectedImages([])

  return (
    <SelectionContext.Provider value={{ selectedImages, toggleSelection, isSelected, clearSelection }}>
      {children}
    </SelectionContext.Provider>
  )
}

export const useSelection = () => {
  const context = useContext(SelectionContext)
  if (!context) {
    throw new Error("useSelection must be used within SelectionProvider")
  }
  return context
}
