import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { artists } from '../data/artists'
import ArtistCard from '../components/ArtistCard'
import SearchBar from '../components/SearchBar'
import './Items.css'

function Items() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const filtered = artists.filter(a =>
    [a.name, a.genre, a.country]
      .join(' ')
      .toLowerCase()
      .includes(query.toLowerCase())
  )

  function handleRandom() {
    const random = artists[Math.floor(Math.random() * artists.length)]
    navigate(`/items/${random.id}`)
  }

  return (
    <main className="items-page">
      <h1 className="items-page__heading">Artistas</h1>
      <SearchBar value={query} onChange={e => setQuery(e.target.value)} />
      <div className="items-page__actions">
        <button className="items-page__random-btn" onClick={handleRandom}>
          Artista aleatorio
        </button>
      </div>
      {filtered.length === 0 ? (
        <p className="items-page__empty">
          No se encontraron artistas para &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="items-page__grid">
          {filtered.map(artist => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      )}
    </main>
  )
}

export default Items
