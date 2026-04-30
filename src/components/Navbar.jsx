import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="navbar__brand">
        Rock &amp; Pop Archive
      </NavLink>
      <nav className="navbar__links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
        >
          Inicio
        </NavLink>
        <NavLink
          to="/items"
          className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
        >
          Artistas
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
        >
          Favoritos
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar
