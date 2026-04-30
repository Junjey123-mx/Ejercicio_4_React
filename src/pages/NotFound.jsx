import { Link } from 'react-router-dom'
import './Page.css'

function NotFound() {
  return (
    <main className="page">
      <h1>404</h1>
      <p className="page__subtitle">La página que buscas no existe.</p>
      <Link to="/" className="page__btn">
        Volver al inicio
      </Link>
    </main>
  )
}

export default NotFound
