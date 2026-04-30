const API_KEY = import.meta.env.VITE_AUDIODB_KEY ?? '123'
const BASE_URL = `https://www.theaudiodb.com/api/v1/json/${API_KEY}`

async function request(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export function getArtistByName(artistName) {
  return request(`/search.php?s=${encodeURIComponent(artistName)}`)
}

export function getArtistAlbums(artistName) {
  return request(`/searchalbum.php?s=${encodeURIComponent(artistName)}`)
}
