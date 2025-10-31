"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { SelectionProvider } from "./context/SelectionContext"
import AuthButton from "./components/AuthButton"
import Home from "./pages/Home"
import AuthSuccess from "./pages/AuthSuccess"

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return isAuthenticated ? children : <AuthButton />
}

function AppContent() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/app" /> : <AuthButton />} />
      <Route path="/auth/success" element={<AuthSuccess />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <SelectionProvider>
          <AppContent />
        </SelectionProvider>
      </AuthProvider>
    </Router>
  )
}
