import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTheme } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Items from './pages/Items'
import ItemDetail from './pages/ItemDetail'
import Favorites from './pages/Favorites'
import NotFound from './pages/NotFound'

function App() {
  const { theme } = useTheme()

  return (
    <BrowserRouter>
      <div className={`app app--${theme}`}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<Items />} />
          <Route path="/items/:id" element={<ItemDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
