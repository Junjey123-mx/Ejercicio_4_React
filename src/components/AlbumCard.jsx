import PropTypes from 'prop-types'
import './AlbumCard.css'

function AlbumCard({ album }) {
  return (
    <article className="album-card">
      {album.strAlbumThumb ? (
        <img
          src={album.strAlbumThumb}
          alt={album.strAlbum}
          className="album-card__cover"
        />
      ) : (
        <div className="album-card__cover album-card__cover--placeholder">💿</div>
      )}
      <div className="album-card__info">
        <h3 className="album-card__title">{album.strAlbum}</h3>
        {album.intYearReleased && (
          <span className="album-card__year">{album.intYearReleased}</span>
        )}
      </div>
    </article>
  )
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    idAlbum: PropTypes.string.isRequired,
    strAlbum: PropTypes.string.isRequired,
    strAlbumThumb: PropTypes.string,
    intYearReleased: PropTypes.string,
  }).isRequired,
}

export default AlbumCard
