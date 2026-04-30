import PropTypes from 'prop-types'
import { useFavoritesState, useFavoritesDispatch } from '../context/FavoritesContext'
import './FavoriteButton.css'

function FavoriteButton({ artist }) {
  const favorites = useFavoritesState()
  const dispatch = useFavoritesDispatch()
  const isFavorite = favorites.some(a => a.id === artist.id)

  function handleClick() {
    dispatch(
      isFavorite
        ? { type: 'REMOVE_FAVORITE', id: artist.id }
        : { type: 'ADD_FAVORITE', artist }
    )
  }

  return (
    <button
      className={`fav-btn${isFavorite ? ' fav-btn--active' : ''}`}
      onClick={handleClick}
    >
      {isFavorite ? '★ Quitar de favoritos' : '☆ Agregar a favoritos'}
    </button>
  )
}

FavoriteButton.propTypes = {
  artist: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
}

export default FavoriteButton
