import PropTypes from 'prop-types'
import './SearchBar.css'

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="search"
        placeholder="Buscar por nombre, género o país…"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default SearchBar
