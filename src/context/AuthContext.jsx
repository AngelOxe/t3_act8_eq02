import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getCurrentUser, loginWithDummyJSON } from '../services/authService'

const AuthContext = createContext(null)
const TOKEN_KEY = 'medicita_act8_demo_token'

function toPublicProfile(user) {
  return {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    image: user.image,
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(() => Boolean(sessionStorage.getItem(TOKEN_KEY)))

  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN_KEY)
    if (!token) return
    let active = true
    getCurrentUser(token)
      .then(data => { if (active) setUser(toPublicProfile(data)) })
      .catch(() => { if (active) sessionStorage.removeItem(TOKEN_KEY) })
      .finally(() => { if (active) setChecking(false) })
    return () => { active = false }
  }, [])

  const login = useCallback(async (identifier, password) => {
    const result = await loginWithDummyJSON(identifier, password)
    // Solo demostración académica. No usar sessionStorage para tokens en producción.
    sessionStorage.setItem(TOKEN_KEY, result.accessToken)
    const profile = toPublicProfile(result)
    setUser(profile)
    return profile
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, checking, login, logout, isAuthenticated: Boolean(user) }), [user, checking, login, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe utilizarse dentro de AuthProvider.')
  return context
}
