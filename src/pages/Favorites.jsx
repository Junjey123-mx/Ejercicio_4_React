import { Link } from 'react-router-dom'
import { useFavoritesState, useFavoritesDispatch } from '../context/FavoritesContext'
import ArtistCard from '../components/ArtistCard'
import './Favorites.css'

function Favorites() {
  const favorites = useFavoritesState()
  const dispatch = useFavoritesDispatch()

  return (
    <main className="fav-page">
      <h1>Mis favoritos</h1>

      {favorites.length === 0 ? (
        <>
          <p className="fav-page__empty">
            No has marcado ningún artista como favorito todavía.
          </p>
          <Link to="/items" className="fav-page__explore-link">
            Explorar artistas
          </Link>
        </>
      ) : (
        <>
          <div className="fav-page__actions">
            <button
              className="fav-page__clear-btn"
              onClick={() => dispatch({ type: 'CLEAR_FAVORITES' })}
            >
              Limpiar todos
            </button>
          </div>
          <div className="fav-page__grid">
            {favorites.map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </>
      )}
    </main>
  )
}

export default Favorites
