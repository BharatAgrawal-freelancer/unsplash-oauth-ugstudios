"use client"

import { useSelection } from "../context/SelectionContext"

export default function ImageGrid({ images, isLoading }) {
  const { toggleSelection, isSelected } = useSelection()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No images found. Try searching for something!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition"
        >
          <img
            src={image.urls.small || "/placeholder.svg"}
            alt={image.alt}
            className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
          />

          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
            <label className="absolute top-2 left-2 flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isSelected(image.id)}
                onChange={() => toggleSelection(image)}
                className="w-5 h-5 cursor-pointer"
              />
            </label>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 text-white opacity-0 group-hover:opacity-100 transition">
              <p className="text-sm font-semibold truncate">{image.author.name}</p>
              <p className="text-xs text-gray-300">{image.likes} likes</p>
            </div>
          </div>

          {isSelected(image.id) && (
            <div className="absolute inset-0 border-4 border-blue-500 rounded-lg pointer-events-none"></div>
          )}
        </div>
      ))}
    </div>
  )
}
