"use client"

import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold">🔍 ImageSearch</div>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {user.profilePhoto && (
                <img
                  src={user.profilePhoto || "/placeholder.svg"}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              )}
              <span className="text-sm font-medium">{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-medium transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
