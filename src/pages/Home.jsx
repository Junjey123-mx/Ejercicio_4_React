import { Link } from 'react-router-dom'
import './Page.css'

function Home() {
  return (
    <main className="page">
      <h1>Rock &amp; Pop Archive</h1>
      <p className="page__subtitle">
        Explora artistas de rock, pop y géneros relacionados.
        Consulta su historia, álbumes y guarda tus favoritos.
      </p>
      <Link to="/items" className="page__btn">
        Ver artistas
      </Link>
    </main>
  )
}

export default Home
