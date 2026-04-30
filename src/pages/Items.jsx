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
      <p className="items-page__subheading">
        {artists.length} artistas · filtra por nombre, género o país
      </p>

      <div className="items-page__toolbar">
        <SearchBar value={query} onChange={e => setQuery(e.target.value)} />
        <button className="items-page__random-btn" onClick={handleRandom}>
          ✨ Artista aleatorio
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="items-page__empty">
          <span className="items-page__empty-icon">🔎</span>
          No se encontraron artistas para &ldquo;{query}&rdquo;.
        </div>
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
