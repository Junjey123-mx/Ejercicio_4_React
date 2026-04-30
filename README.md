# Rock & Pop Archive

Mini-blog musical construido con **Vite + React + React Router v6**.  
Muestra artistas de rock y pop, permite buscar, explorar detalles con datos de TheAudioDB y guardar favoritos con Context API.

## Nivel seleccionado

**Senior — 100 puntos**

---

## Tecnologías

| Herramienta | Versión |
|---|---|
| React | 19 |
| react-router-dom | ^6.30 |
| prop-types | ^15.8 |
| Vite | 8 |
| TheAudioDB API | v1 (pública, key `123`) |

---

## Rutas disponibles

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `Home` | Pantalla de bienvenida con enlace al listado |
| `/items` | `Items` | Listado con búsqueda/filtro y botón aleatorio |
| `/items/:id` | `ItemDetail` | Detalle del artista: API, imagen, discografía y favorito |
| `/favorites` | `Favorites` | Artistas guardados como favoritos |
| `*` | `NotFound` | Página 404 |

---

## Instalación local

```bash
npm install
npm run dev
```

Abrir: **http://localhost:5173**

---

## Variables de entorno

```bash
cp .env.example .env
```

`.env.example`:

```
VITE_AUDIODB_KEY=123
```

La key `123` es pública y funciona sin registro previo.

---

## Ejecución con Docker

```bash
docker compose up --build
```

Abrir: **http://localhost:5173**

Para apagar:

```bash
docker compose down
```

---

## API utilizada

**TheAudioDB** — `https://www.theaudiodb.com/api/v1/json/{API_KEY}`

| Endpoint | Uso |
|---|---|
| `/search.php?s={nombre}` | Información del artista |
| `/searchalbum.php?s={nombre}` | Álbumes del artista |

El servicio vive en `src/services/audioDbApi.js`.  
Los datos base locales viven en `src/data/artists.js`.  
Ningún componente hardcodea listas de artistas.

---

## Componentes reutilizables

### ArtistCard

Muestra una tarjeta con los datos principales del artista y enlace al detalle.

| Prop | Tipo | Requerida |
|---|---|---|
| `artist.id` | `string` | ✓ |
| `artist.name` | `string` | ✓ |
| `artist.genre` | `string` | ✓ |
| `artist.country` | `string` | ✓ |
| `artist.description` | `string` | ✓ |

### SearchBar

Input controlado para filtrar artistas por nombre, género o país.

| Prop | Tipo | Requerida |
|---|---|---|
| `value` | `string` | ✓ |
| `onChange` | `func` | ✓ |

### AlbumCard

Muestra la portada, nombre y año de un álbum de TheAudioDB.

| Prop | Tipo | Requerida |
|---|---|---|
| `album.idAlbum` | `string` | ✓ |
| `album.strAlbum` | `string` | ✓ |
| `album.strAlbumThumb` | `string` | — |
| `album.intYearReleased` | `string` | — |

### FavoriteButton

Agrega o quita un artista de favoritos usando `FavoritesContext`.

| Prop | Tipo | Requerida |
|---|---|---|
| `artist` | `object` | ✓ |

Hooks del contexto: `useFavoritesState()`, `useFavoritesDispatch()`.

---

## Rúbrica de cumplimiento

### Junior ✓

- [x] Proyecto generado con `npm create vite@latest`
- [x] Uso de React
- [x] Rutas `/`, `/items`, `/items/:id` con React Router v6
- [x] Datos base en `src/data/artists.js`
- [x] `useParams` en `ItemDetail`
- [x] Navegación con `Link` / `NavLink`, nunca con `<a>`
- [x] README con instrucciones
- [ ] Video demo en `/demo/demo-routes.mp4` — **pendiente grabar**

### Mid ✓

- [x] Página 404 (`*` → `NotFound`)
- [x] Ruta `/favorites`
- [x] Filtro de búsqueda en `/items` (nombre, género, país)
- [x] Botón "Artista aleatorio" con `useNavigate`
- [x] Componentes reutilizables con props documentadas

### Senior ✓

- [x] Estado global con Context API + `useReducer` (`FavoritesContext`)
- [x] PropTypes en 5 componentes: `ArtistCard`, `SearchBar`, `AlbumCard`, `FavoriteButton`, `ErrorMessage`
- [x] Consumo de API pública: TheAudioDB (imagen, biografía, discografía)

---

## Video demo

> ⚠️ El video de demostración **debe colocarse en `/demo/demo-routes.mp4`** antes de la entrega final.  
> El archivo no está incluido en el repositorio; el directorio `/demo` existe con un `.gitkeep`.

El video debe mostrar:

1. Ruta `/` — pantalla de bienvenida
2. Ruta `/items` — grid de tarjetas de artistas
3. Filtro de búsqueda en tiempo real
4. Botón "Artista aleatorio" navegando a un detalle
5. Ruta `/items/:id` — imagen y álbumes cargados desde la API
6. Click en "Agregar a favoritos" en el detalle
7. Ruta `/favorites` — artista guardado visible
8. "Quitar de favoritos" o "Limpiar todos"
9. Ruta inexistente → página 404
