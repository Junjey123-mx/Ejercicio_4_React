import { Link } from 'react-router-dom'
import './Page.css'

function NotFound() {
  return (
    <main className="page fade-in">
      <span className="page__icon">🎧</span>
      <h1>404</h1>
      <p className="page__subtitle">Esta página no existe en el setlist.</p>
      <Link to="/" className="page__btn">
        Volver al inicio
      </Link>
    </main>
  )
}

export default NotFound
