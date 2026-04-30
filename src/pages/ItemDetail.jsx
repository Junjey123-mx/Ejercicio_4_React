import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { artists } from '../data/artists'
import { getArtistByName, getArtistAlbums } from '../services/audioDbApi'
import AlbumCard from '../components/AlbumCard'
import LoadingMessage from '../components/LoadingMessage'
import ErrorMessage from '../components/ErrorMessage'
import FavoriteButton from '../components/FavoriteButton'
import './ItemDetail.css'

function ItemDetail() {
  const { id } = useParams()
  const localArtist = artists.find(a => a.id === id)

  const [artistInfo, setArtistInfo] = useState(null)
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!localArtist) return
    setLoading(true)
    setError(null)
    Promise.all([
      getArtistByName(localArtist.name),
      getArtistAlbums(localArtist.name),
    ])
      .then(([artistData, albumData]) => {
        setArtistInfo(artistData?.artists?.[0] ?? null)
        setAlbums(albumData?.album ?? [])
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [localArtist])

  if (!localArtist) {
    return (
      <main className="detail-page">
        <div className="detail-page__not-found">
          <span className="detail-page__not-found-icon">🎧</span>
          <h1>Artista no encontrado</h1>
          <Link to="/items" className="detail-page__back">
            ← Volver al listado
          </Link>
        </div>
      </main>
    )
  }

  const image = artistInfo?.strArtistThumb || artistInfo?.strArtistFanart || null
  const genre = artistInfo?.strGenre || localArtist.genre
  const country = artistInfo?.strCountry || localArtist.country
  const bio = artistInfo?.strBiographyEN || localArtist.description

  return (
    <main className="detail-page">
      <Link to="/items" className="detail-page__back">
        ← Volver al listado
      </Link>

      {loading && <LoadingMessage />}
      {error && <ErrorMessage message={error} />}

      {!loading && (
        <>
          <div className="detail-page__header">
            {image ? (
              <img
                src={image}
                alt={localArtist.name}
                className="detail-page__img"
              />
            ) : (
              <div className="detail-page__img-placeholder">🎸</div>
            )}
            <div className="detail-page__info">
              <h1>{localArtist.name}</h1>
              <div className="detail-page__chips">
                <span className="chip">{genre}</span>
                <span className="chip">{country}</span>
              </div>
              <p className="detail-page__bio">{bio}</p>
              <FavoriteButton artist={localArtist} />
            </div>
          </div>

          {albums.length > 0 && (
            <section className="detail-page__albums">
              <h2>Discografía ({albums.length} álbumes)</h2>
              <div className="detail-page__albums-grid">
                {albums.map(album => (
                  <AlbumCard key={album.idAlbum} album={album} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  )
}

export default ItemDetail
