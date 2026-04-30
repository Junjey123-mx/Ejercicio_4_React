import { createContext, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'

const FavoritesStateContext = createContext(null)
const FavoritesDispatchContext = createContext(null)

function favoritesReducer(state, action) {
  switch (action.type) {
    case 'ADD_FAVORITE':
      if (state.some(a => a.id === action.artist.id)) return state
      return [...state, action.artist]
    case 'REMOVE_FAVORITE':
      return state.filter(a => a.id !== action.id)
    case 'CLEAR_FAVORITES':
      return []
    default:
      return state
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, dispatch] = useReducer(favoritesReducer, [])
  return (
    <FavoritesStateContext.Provider value={favorites}>
      <FavoritesDispatchContext.Provider value={dispatch}>
        {children}
      </FavoritesDispatchContext.Provider>
    </FavoritesStateContext.Provider>
  )
}

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useFavoritesState() {
  const ctx = useContext(FavoritesStateContext)
  if (ctx === null) {
    throw new Error('useFavoritesState must be used within FavoritesProvider')
  }
  return ctx
}

export function useFavoritesDispatch() {
  const ctx = useContext(FavoritesDispatchContext)
  if (ctx === null) {
    throw new Error('useFavoritesDispatch must be used within FavoritesProvider')
  }
  return ctx
}
