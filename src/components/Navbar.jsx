import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import './Navbar.css'

function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="navbar">
      <NavLink to="/" className="navbar__brand">
        Rock &amp; Pop Archive
      </NavLink>

      <div className="navbar__right">
        <nav className="navbar__links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
            }
          >
            Inicio
          </NavLink>
          <NavLink
            to="/items"
            className={({ isActive }) =>
              isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
            }
          >
            Artistas
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
            }
          >
            Favoritos
          </NavLink>
        </nav>

        <button
          className="navbar__theme-btn"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
        >
          {theme === 'dark' ? '☀️ Claro' : '🌙 Oscuro'}
        </button>
      </div>
    </header>
  )
}

export default Navbar
