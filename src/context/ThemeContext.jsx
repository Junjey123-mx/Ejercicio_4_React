import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const STORAGE_KEY = 'rock-pop-theme'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || 'dark'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  function toggleTheme() {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (ctx === null) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}
