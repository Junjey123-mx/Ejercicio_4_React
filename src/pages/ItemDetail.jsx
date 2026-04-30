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
        <h1>Artista no encontrado</h1>
        <Link to="/items" className="detail-page__back">
          ← Volver al listado
        </Link>
      </main>
    )
  }

  const image =
    artistInfo?.strArtistThumb || artistInfo?.strArtistFanart || null

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
              <div className="detail-page__img-placeholder" />
            )}
            <div className="detail-page__info">
              <h1>{localArtist.name}</h1>
              <p className="detail-page__genre">
                {artistInfo?.strGenre || localArtist.genre}
              </p>
              <p className="detail-page__country">
                {artistInfo?.strCountry || localArtist.country}
              </p>
              <p className="detail-page__bio">
                {artistInfo?.strBiographyEN || localArtist.description}
              </p>
              <FavoriteButton artist={localArtist} />
            </div>
          </div>

          {albums.length > 0 && (
            <section className="detail-page__albums">
              <h2>Discografía</h2>
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
