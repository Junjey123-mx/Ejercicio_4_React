import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './ArtistCard.css'

function ArtistCard({ artist }) {
  return (
    <article className="artist-card">
      <h2 className="artist-card__name">{artist.name}</h2>
      <div className="artist-card__meta">
        <span className="artist-card__genre">{artist.genre}</span>
        <span className="artist-card__country">{artist.country}</span>
      </div>
      <p className="artist-card__desc">{artist.description}</p>
      <Link to={`/items/${artist.id}`} className="artist-card__link">
        Ver más
      </Link>
    </article>
  )
}

ArtistCard.propTypes = {
  artist: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
}

export default ArtistCard
