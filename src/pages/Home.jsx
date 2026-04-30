import { Link } from 'react-router-dom'
import FeatureCard from '../components/FeatureCard'
import './Home.css'

const FEATURES = [
  {
    icon: '🎸',
    title: 'Explora artistas',
    description:
      'Rock, pop, metal, grunge y más. Una colección curada de los grandes de la música.',
  },
  {
    icon: '💿',
    title: 'Descubre discografías',
    description:
      'Consulta álbumes, portadas y años de lanzamiento de cada artista desde TheAudioDB.',
  },
  {
    icon: '⭐',
    title: 'Guarda favoritos',
    description:
      'Marca artistas como favoritos y accede a tu lista personal en cualquier momento.',
  },
]

function Home() {
  return (
    <main className="home">
      {/* Hero */}
      <section className="home__hero slide-up">
        <span className="home__tag chip">🎵 Rock &amp; Pop Archive</span>
        <h1 className="home__title">
          Tu archivo de
          <br />
          <span className="home__title-accent">rock y pop</span>
        </h1>
        <p className="home__subtitle">
          Explora artistas, descubre discografías y guarda tus favoritos.
          Todo en un solo lugar, impulsado por TheAudioDB.
        </p>
        <div className="home__cta">
          <Link to="/items" className="home__cta-primary">
            🎸 Explorar artistas
          </Link>
          <Link to="/favorites" className="home__cta-secondary">
            ⭐ Mis favoritos
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="home__features fade-in">
        {FEATURES.map(f => (
          <FeatureCard
            key={f.title}
            icon={f.icon}
            title={f.title}
            description={f.description}
          />
        ))}
      </section>

      {/* Preview panel */}
      <section className="home__preview fade-in">
        <div className="home__preview-panel">
          <div className="home__preview-search">
            <span>🔎</span>
            <span className="home__preview-search-placeholder">
              Buscar por nombre, género o país…
            </span>
          </div>
          <div className="home__preview-chips">
            {['Rock', 'Pop', 'Metal', 'Grunge', 'Progresivo'].map(g => (
              <span key={g} className="chip">{g}</span>
            ))}
          </div>
          <div className="home__preview-cards">
            {['The Beatles', 'Queen', 'Nirvana'].map(name => (
              <div key={name} className="home__preview-card">
                <div className="home__preview-card-avatar" />
                <span className="home__preview-card-name">{name}</span>
                <span className="home__preview-card-arrow">→</span>
              </div>
            ))}
          </div>
          <div className="home__preview-fav">☆ Agregar a favoritos</div>
        </div>

        <div className="home__preview-text">
          <h2>Encuentra lo que buscas</h2>
          <p>
            Filtra en tiempo real por nombre, género o país. Accede al detalle
            de cualquier artista para ver imagen, biografía completa y
            discografía directamente desde la API.
          </p>
          <Link to="/items" className="home__preview-link">
            Ver el listado completo →
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Home
