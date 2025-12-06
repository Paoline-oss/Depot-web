import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import HeroDetails from './pages/HeroDetails'
import AddHero from './pages/AddHero'
import EditHero from './pages/EditHero'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import DeleteHero from './pages/DeleteHero'

function AppContent() {
  const location = useLocation()

  return (
    <>
      {/* ✅ Navbar affichée partout sauf sur /login */}
      {location.pathname !== "/login" && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/add" element={<ProtectedRoute><AddHero /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditHero /></ProtectedRoute>} />
        <Route path="/delete" element={<ProtectedRoute><DeleteHero/></ProtectedRoute>} />
        <Route path="/heroes/:id" element={<ProtectedRoute><HeroDetails /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

export default App


