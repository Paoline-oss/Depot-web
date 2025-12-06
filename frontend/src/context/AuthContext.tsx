
import { createContext, useState, useEffect, type ReactNode } from 'react'

interface AuthContextType {
  token: string | null
  role: string | null
  login: (token: string, role: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  role: null,
  login: () => {},
  logout: () => {}
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [role, setRole] = useState<string | null>(localStorage.getItem('role'))

  const login = (token: string, role: string) => {
    setToken(token)
    setRole(role)
    localStorage.setItem('token', token)
    localStorage.setItem('role', role)
  }

  const logout = () => {
    setToken(null)
    setRole(null)
    localStorage.removeItem('token')
    localStorage.removeItem('role')
  }

  useEffect(() => {
    // Synchroniser avec localStorage au démarrage
    setToken(localStorage.getItem('token'))
    setRole(localStorage.getItem('role'))
  }, [])

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}